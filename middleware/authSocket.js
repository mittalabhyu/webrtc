const jwt = require("jsonwebtoken");



const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, "hereShouldGoStrongTokenKey");
    socket.user = decoded;
  } catch (err) {
    const socketError = new Error("NOT_AUTHORIZED");
    return next(socketError);
  }

  next();
};

module.exports = verifyTokenSocket;
