const { Server } = require("socket.io");
const ChatModel = require("../models/chatmodel");

const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  });

  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("socket_id", socket.id);

    socket.on("active_users", (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit("active_online_users", Array.from(onlineUsers.keys()));
    });

    socket.on("join room", ({ fromUser, targetUser }) => {
      const roomId = [fromUser, targetUser].sort().join("_");
      socket.join(roomId);
      // console.log(roomId, "roomId");
    });

    socket.on("chat_msg", async ({ fromUser, targetUser, text }) => {
      const roomId = [fromUser, targetUser].sort().join("_");
      let existingChat = await ChatModel.findOne({
        participants: {
          $all: [fromUser, targetUser],
        },
      });

      if (!existingChat) {
        existingChat = new ChatModel({
          participants: [fromUser, targetUser],
          messages: [],
        });
      }

      existingChat.messages.push({
        sender: fromUser,
        text,
      });

      await existingChat.save();

      const dateTime = new Date();
      io.to(roomId).emit("recived_msg", { text, fromUser, dateTime });
    });

    socket.on("users_logout", (userId) => {
      if (onlineUsers.has(userId)) {
        onlineUsers.delete(userId);
        io.emit("active_online_users", Array.from(onlineUsers.keys()));
      }
    });

    socket.on("disconnect", () => {
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          io.emit("active_online_users", Array.from(onlineUsers.keys()));
          break;
        }
      }

      console.log("disconnect");
    });
  });
};

module.exports = createSocketServer;
