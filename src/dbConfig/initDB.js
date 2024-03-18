// const mongoose = require('mongoose')

// module.exports = () => {
//   mongoose.connect(process.env.MONGODB_URI).then(() => {
//     console.log("mongo db is connected...");
//   });
// };

const mongoose = require("mongoose");

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo DB connected");
  } catch (error) {
    console.log("Mongo DB connection fails", error.message || error);
  }
};

module.exports = dbConfig;