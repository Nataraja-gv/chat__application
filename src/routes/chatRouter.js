const express = require("express");
const { getUsersChats, getUnReadMessagesCounts } = require("../controllers/chatControllers");
const UserAuth = require("../middlewares/userAuth");

const chatRouter = express.Router();

chatRouter.get("/backend/user/chat", UserAuth, getUsersChats);
chatRouter.get("/backend/user/chat/unread", UserAuth, getUnReadMessagesCounts);


module.exports = chatRouter;
