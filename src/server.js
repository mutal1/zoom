import http from "http"
import WebSocket from "ws"
import express from "express";

const app = express();
const port = 3000;
// __dirname == nodemon.json ���� path
app.set("view engine", "pug"); //view engine ����
app.set("views",__dirname +"/views"); //view dir path ����
app.use("/public", express.static(__dirname + "/public"));
app.get("/",(req,res) => res.render("home"));

//JavaScript���� �ݹ� �Լ��� �ٸ� �Լ��� �μ��� ���޵Ǿ� ���߿� �Ǵ� �񵿱� �۾� �Ϸ� �Ŀ� ����Ǵ� �Լ��Դϴ�. �ݹ� �Լ��� JavaScript�� �⺻ �����̸� �̺�Ʈ ó��, API ȣ��, �񵿱� �۾� ó���� ���� �ó��������� �θ� ���˴ϴ�.
const handleListen = () => console.log(`Listening on http:localhost:${port}`);

const server = http.createServer(app);

const ws_server = new WebSocket.Server({server});

const sockets = new Map(); //dic ���� key���� �ߺ��ȵǴ� ��ü

function str2json(object){
    let str = JSON.parse(object);
    return str;
}
//������ ����
ws_server.on("connection", (socket) => {
  const socketId = Date.now();
  socket["nickname"] = "Anon";
  sockets.set(socketId, socket); // key,value ����

  console.log(`Connected from browser:${socketId}`);
//   socket.send(`welcome ${socketId}!`);

  socket.on("close", () => {
    sockets.delete(socketId);
    console.log(`Disconnected from browser:${socketId}`);
  });

  socket.on("message", (message) => {
    const buffer = Buffer.from(message);
    const str = buffer.toString("utf8");
    const message_type = str2json(str);
    // console.log(message_type);
    sockets.forEach((aSocket) => {
        // if(aSocket !== socket){
            if(message_type.type === "nickname"){
                socket["nickname"] = message_type.payload;
            }
            // console.log(message_type.payload);
            else if(message_type.type === "message"){
            aSocket.send(JSON.stringify({ 
                nickname:socket.nickname,
                message:message_type.payload
            }));
        }
        // }
    });   
  });
});

server.listen(3000,handleListen);