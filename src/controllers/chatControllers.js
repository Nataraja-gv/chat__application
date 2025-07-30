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

module.exports = { getUsersChats };
