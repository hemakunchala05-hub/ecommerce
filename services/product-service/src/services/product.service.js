

const StockReservation = require("../models/stock-reservation.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

// Escape special characters before using user input in a regex
const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// Validate MongoDB product ID
const validateProductId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid product ID");
  }
};

// Find a product by name, type and brand, ignoring capitalization
const findDuplicateProduct = async (pname, type, brand, excludeId = null) => {
  const filter = {
    pname: {
      $regex: `^${escapeRegex(pname.trim())}$`,
      $options: "i",
    },
    type: {
      $regex: `^${escapeRegex(type.trim())}$`,
      $options: "i",
    },
    brand: {
      $regex: `^${escapeRegex(brand.trim())}$`,
      $options: "i",
    },
  };

  // Exclude the current product when checking an update
  if (excludeId) {
    filter._id = { $ne: excludeId };
  }

  return await Product.findOne(filter);
};


// 1. Create a new product
const createProduct = async (
  pname,
  type,
  brand,
  description,
  price,
  stock,
  discount = 0,
  imageUrl
) => {
  // Validate identity fields before using trim()
  if (
    typeof pname !== "string" ||
    !pname.trim() ||
    typeof type !== "string" ||
    !type.trim() ||
    typeof brand !== "string" ||
    !brand.trim()
  ) {
    throw new Error("Name, type and brand are required");
  }

  const existingProduct = await findDuplicateProduct(
    pname,
    type,
    brand
  );

  if (existingProduct) {
    throw new Error("Product already exists");
  }

  const product = await Product.create({
    pname: pname.trim(),
    type: type.trim(),
    brand: brand.trim(),
    description,
    price,
    stock,
    discount,
    imageUrl,
  });

  return product;
};


// 2. Get all products
const getAllProducts = async () => {
  return await Product.find({});
};


// 3. Get a product by its MongoDB ID
const getProductById = async (id) => {
  validateProductId(id);

  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};


// 4. Get all products of a specific type
const getProductByType = async (type) => {
  if (typeof type !== "string" || !type.trim()) {
    throw new Error("Product type is required");
  }

  return await Product.find({
    type: {
      $regex: `^${escapeRegex(type.trim())}$`,
      $options: "i",
    },
  });
};


// 5. Update an existing product
const updateProduct = async (id, updateData) => {
  validateProductId(id);

  if (
    !updateData ||
    typeof updateData !== "object" ||
    Array.isArray(updateData)
  ) {
    throw new Error("Invalid product update data");
  }

  // Only allow fields that belong to a product
  const allowedFields = [
    "pname",
    "type",
    "brand",
    "description",
    "price",
    "stock",
    "discount",
    "imageUrl",
  ];

  const fieldsToUpdate = Object.keys(updateData);

  if (
    fieldsToUpdate.length === 0 ||
    fieldsToUpdate.some((field) => !allowedFields.includes(field))
  ) {
    throw new Error("Invalid or empty product update fields");
  }

  const currentProduct = await Product.findById(id);

  if (!currentProduct) {
    throw new Error("Product not found");
  }

  // Build the product's identity after the proposed update
  const pname = updateData.pname ?? currentProduct.pname;
  const type = updateData.type ?? currentProduct.type;
  const brand = updateData.brand ?? currentProduct.brand;

  if (
    typeof pname !== "string" ||
    !pname.trim() ||
    typeof type !== "string" ||
    !type.trim() ||
    typeof brand !== "string" ||
    !brand.trim()
  ) {
    throw new Error("Name, type and brand cannot be empty");
  }

  // Check whether another product already has this identity
  const duplicate = await findDuplicateProduct(
    pname,
    type,
    brand,
    id
  );

  if (duplicate) {
    throw new Error("Another product with the same name, type and brand already exists");
  }

  // Store trimmed identity values
  const safeUpdateData = {
    ...updateData,
    pname: pname.trim(),
    type: type.trim(),
    brand: brand.trim(),
  };

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: safeUpdateData },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedProduct;
};


// 6. Delete a product
const deleteProduct = async (id) => {
  validateProductId(id);

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};


/**
 * Atomically reserve stock for an order.
 * Returns the updated product if enough stock exists.
 */

const reserveStock = async (orderId, userId, items) => {
  if (
    !orderId ||
    !userId ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    throw new Error("Order ID, user ID, and items are required");
  }

  const existing = await StockReservation.findOne({ orderId });

  if (existing) {
    throw new Error("Reservation already exists for this order");
  }

  const normalizedItems = items.map((item) => {
    validateProductId(item.productId);

    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error("Quantity must be a positive integer");
    }

    return {
      productId: item.productId,
      quantity: item.quantity,
    };
  });

  const reservedItems = [];

  try {
    for (const item of normalizedItems) {
      const product = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          stock: { $gte: item.quantity },
        },
        {
          $inc: { stock: -item.quantity },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!product) {
        const exists = await Product.exists({ _id: item.productId });

        if (!exists) {
          throw new Error(`Product ${item.productId} not found`);
        }

        throw new Error(`Insufficient stock for ${product?.pname || item.productId}`);
      }

      reservedItems.push(item);
    }

    const reservation = await StockReservation.create({
      orderId: String(orderId),
      userId: String(userId),
      items: normalizedItems,
      status: "reserved",
    });

    return reservation;
  } catch (error) {
    // Restore stock already decremented during this attempt
    for (const item of reservedItems.reverse()) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stock: item.quantity } }
      );
    }

    throw error;
  }
};

const releaseStock = async (orderId, userId) => {
  const reservation = await StockReservation.findOne({
    orderId: String(orderId),
    userId: String(userId),
  });

  if (!reservation) {
    throw new Error("Stock reservation not found");
  }

  if (reservation.status === "released") {
    return reservation;
  }

  if (reservation.status === "committed") {
    throw new Error("Committed stock cannot be released");
  }

  // Claim the release so concurrent requests cannot both restore stock
  const claimedReservation = await StockReservation.findOneAndUpdate(
    {
      _id: reservation._id,
      status: "reserved",
    },
    {
      $set: { status: "released" },
    },
    {
      new: true,
    }
  );

  if (!claimedReservation) {
    const latest = await StockReservation.findById(reservation._id);

    if (latest?.status === "released") {
      return latest;
    }

    throw new Error("Reservation could not be released");
  }

  try {
    for (const item of claimedReservation.items) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stock: item.quantity } }
      );
    }

    return claimedReservation;
  } catch (error) {
    // Keep the reservation marked released only if all stock updates succeed.
    // Production implementation will need a MongoDB transaction/outbox or
    // a recoverable release state to handle partial failures safely.
    throw error;
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByType,
  updateProduct,
  deleteProduct,
  reserveStock,
  releaseStock
};
