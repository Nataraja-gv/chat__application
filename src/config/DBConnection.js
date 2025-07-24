const mongoose = require("mongoose");

const ConnectDB = async () => {
  await mongoose.connect(
    `${process.env.MONGOOSE_CONNECTION_SECRET_URL}/Chatapp`
  );
};

module.exports = ConnectDB;
