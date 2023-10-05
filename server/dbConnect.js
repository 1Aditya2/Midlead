const mongoose = require("mongoose");
//hr138TfgXpERRIyf
//mYbjBVOWOTxNSn7k
//some code to connect with database MONGODB ATLAS
module.exports = async () => {
  

  try {
    const mongoUri =
    "mongodb+srv://hero1:mYbjBVOWOTxNSn7k@cluster0.htm52hk.mongodb.net/?retryWrites=true&w=majority";
    const connect = await mongoose.connect(mongoUri);
    // console.log(connect)
    console.log(`MongoDB connected:  ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("error in dbconnect.js");
    process.exit(1);
  }
};
