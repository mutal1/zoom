import http from "http"
import WebSocket from "ws"
import express from "express";

const app = express();
const port = 3000;
// __dirname == nodemon.json 에서 path
app.set("view engine", "pug"); //view engine 설정
app.set("views",__dirname +"/views"); //view dir path 설정
app.use("/public", express.static(__dirname + "/public"));
app.get("/",(req,res) => res.render("home"));

//JavaScript에서 콜백 함수는 다른 함수에 인수로 전달되어 나중에 또는 비동기 작업 완료 후에 실행되는 함수입니다. 콜백 함수는 JavaScript의 기본 개념이며 이벤트 처리, API 호출, 비동기 작업 처리와 같은 시나리오에서 널리 사용됩니다.
const handleListen = () => console.log(`Listening on http:localhost:${port}`);

const server = http.createServer(app);

const ws_server = new WebSocket.Server({server});

const sockets = new Map(); //dic 에서 key값이 중복안되는 객체

//서버와 연결
ws_server.on("connection", (socket) => {
  const socketId = Date.now();

  sockets.set(socketId, socket); // key,value 연결

  console.log(`Connected from browser:${socketId}`);
  socket.send(`welcome ${socketId}!`);

  socket.on("close", () => {
    sockets.delete(socketId);
    console.log(`Disconnected from browser:${socketId}`);
  });

  socket.on("message", (message) => {
    const buffer = Buffer.from(message);
    const str = buffer.toString("utf8");
    sockets.forEach((aSocket) => {
        if (aSocket !== socket){
            aSocket.send(`${socketId}:${str}`);
        } 
    });
  });
});

server.listen(3000,handleListen);