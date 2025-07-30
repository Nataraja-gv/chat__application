const { Server } = require("socket.io");

const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("socket_id", socket.id);

    socket.on("join room", ({ fromUser, targetUser }) => {
      const roomId = [fromUser, targetUser].sort().join("_");
      socket.join(roomId);
      //   console.log(roomId, "roomId");
    });

    socket.on("chat_msg", ({ fromUser, targetUser, input }) => {
      const roomId = [fromUser, targetUser].sort().join("_");
      socket.to(roomId).emit("recived_msg", { input, fromUser });
    });
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
};

module.exports = createSocketServer;
