const mongoose = require("mongoose");

const connectionUri = process.env.MONGODB_URI || "mongodb://localhost/gain";
module.exports.connection = async () => {
  try {
    const url =
      "mongodb+srv://Shabab:hellorhythm.1@merng-stack-ardhu.gcp.mongodb.net/MERNG-Stack?retryWrites=true&w=majority";
    mongoose.set("debug", true);
    module.exports.conn = await mongoose.connect(connectionUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected succesfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
