const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  ],
  messages: [messageSchema],
});

const ChatModel = mongoose.model("chats", chatSchema);

module.exports = ChatModel;
