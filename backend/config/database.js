const mongoose = require("mongoose");

const connectDatabase = async () => {
  const uri =
    "mongodb+srv://sanskriti24:SanskritiMalviya@cluster0.th8c5j9.mongodb.net/Ecommerce?retryWrites=true&w=majority";

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB connected successfully!");
};

module.exports = connectDatabase;
