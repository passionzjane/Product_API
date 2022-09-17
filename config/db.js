const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;