import dotenv from "dotenv";
import express, { Express } from "express";
import type { Server as httpServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || "3001");

const server: httpServer = app.listen(port, () =>
  console.log(`⚡️ Server is running at http://localhost:${port}`)
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("An user connected!");
  socket.on("disconnect", () => {
    console.log("An user disconnected!");
  });
  socket.on("chat", (message) => {
    io.emit("chat", message);
  });
});
