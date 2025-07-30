const express = require("express");
const { getUsersChats } = require("../controllers/chatControllers");
const UserAuth = require("../middlewares/userAuth");

const chatRouter = express.Router();

chatRouter.get("/backend/user/chat", UserAuth, getUsersChats);

module.exports = chatRouter;
