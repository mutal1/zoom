import express from "express";

const app = express();
// __dirname == nodemon.json ���� path
app.set("view engine", "pug"); //view engine ����
app.set("views",__dirname +"/views"); //view dir path ����
app.use("/public", express.static(__dirname + "/public"));
app.get("/",(req,res) => res.render("home"));

//JavaScript���� �ݹ� �Լ��� �ٸ� �Լ��� �μ��� ���޵Ǿ� ���߿� �Ǵ� �񵿱� �۾� �Ϸ� �Ŀ� ����Ǵ� �Լ��Դϴ�. �ݹ� �Լ��� JavaScript�� �⺻ �����̸� �̺�Ʈ ó��, API ȣ��, �񵿱� �۾� ó���� ���� �ó��������� �θ� ���˴ϴ�.
const handleListen = () => console.log('Listening on http:localhost:3000');
app.listen(3000,handleListen);
