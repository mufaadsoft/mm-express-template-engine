/*******************************************************
 * THIS PROJECT DEVELOPED FOR EDUCATIONAL PURPOSE ONLY *
 *                     VERSION 0.1                     *
 *                        BY MM                        *
 *******************************************************/
const express = require("express");
const bodyParse = require("body-parser");
const TE = require("./core/engine/template");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3000;

//socket.io
const { Server } = require("socket.io");
const Route = require("./routes/route");
const io = new Server(server);

//engine
app.engine("mm.html", TE);
app.set("views", "./views");
app.set("view engine", "mm.html");
//

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

const messages = [];

Route.forEach((r) => {
  switch (r.method.toLowerCase()) {
    case "post":
      app.post(r.path, r.func);
      break;
    case "get":
      app.get(r.path, r.func);
      break;
    case "put":
      app.put(r.path, r.func);
      break;
    case "delete":
      app.delete(r.path, r.func);
      break;
    case "patch":
      app.patch(r.path, r.func);
      break;
  }
});

// app.get("/", (req, res) => {
// //   res.send(messages);
// res.render("index", {title: "Hi Title", message: "Successfully Developed", system: "IO IO"})
// });

app.post("/", (req, res, next) => {
  const msg = req.body.message;
  messages.push(msg);
  res.send({ status: true, data: messages });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("messages", messages);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  //listen
  socket.on("message", (msg) => {
    messages.push(msg);
    io.emit("messages", messages);
  });
});

server.listen(port, () => {
  console.log(`Server Running localhost:${port}`);
});
