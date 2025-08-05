const ChatModel = require("../models/chatmodel");

const getUsersChats = async (req, res) => {
  try {
    const fromUser = req.user._id;
    const targetUser = req.query.targetUser;
    let chats = await ChatModel.findOne({
      participants: {
        $all: [fromUser, targetUser],
      },
    });

    if (!chats) {
      chats = new ChatModel({
        participants: [fromUser, targetUser],
        messages: [],
      });
    }

    res.status(200).json({ message: "user chats", data: chats });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUnReadMessagesCounts = async (req, res) => {
  try {
    const targetUser = req.user._id;
    const chats = await ChatModel.find({
      participants: targetUser,
    });
    const result = chats.map((chat) => {
      const unreadMessages = chat.messages.filter(
        (msg) => msg.sender.toString() !== targetUser && msg.isRead === false
      );
      const senderId = unreadMessages?.find((it) => it?.sender);
      return {
        chatId: senderId?.sender,
        unreadCount: unreadMessages.length,
      };
    });
    res.status(200).json({ messsage: "user unread messages ", data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getUsersChats, getUnReadMessagesCounts };
