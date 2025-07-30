const express = require("express");
require("dotenv").config();
const ConnectDB = require("./config/DBConnection");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const createSocketServer = require("./utils/createSocket");
const chatRouter = require("./routes/chatRouter");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
createSocketServer(server);
const startServer = async () => {
  try {
    await ConnectDB();
    console.log("✅ Database connected successfully");
    server.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    process.exit(1);
  }
};

startServer();
