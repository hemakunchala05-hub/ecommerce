


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


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByType,
  updateProduct,
  deleteProduct,
};
