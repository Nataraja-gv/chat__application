const express = require("express");
require("dotenv").config();
const ConnectDB = require("./config/DBConnection");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");

 

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use("/", userRouter);

const startServer = async () => {
  try {
    await ConnectDB();
    console.log("✅ Database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    process.exit(1);
  }
};

startServer();
