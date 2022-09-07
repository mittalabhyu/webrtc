const express = require("express");
const https= require("https");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const socketServer = require("./socketServer");
const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{

  res.send("Hello Chal gya bhai")

  res.end()

})

// register the routes
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);

const server = https.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect("mongodb+srv://rohit:Rohitchauhan@cluster0.w28qqbt.mongodb.net/new?retryWrites=true&w=majority")
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed. Server not started");
    console.error(err);
  });
