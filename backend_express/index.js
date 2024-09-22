import { app } from "./app.js";
import express from "express";
import http from "http";

const PORT = process.env.PORT || 3000;
const hostIP = process.env.HOSTIP || "127.0.0.1";
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server Connected to http://${hostIP}:${PORT}`);
});
