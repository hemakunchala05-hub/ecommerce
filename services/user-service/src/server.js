require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');




// Define your port number
const PORT = process.env.PORT || 3000

connectDB();

app.listen(PORT, () => {

  console.log(`server is running on port ${PORT}`)

});




