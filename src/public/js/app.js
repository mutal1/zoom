const socket = new WebSocket(`ws://${window.location.host}`);
function str2json(object) {
    const message_json = JSON.parse(object);
    return message_json;
}
socket.addEventListener("open", () => {
    console.log("connectd from server");

    const nickname_form = document.querySelector("#nickname-form");
    nickname_form.addEventListener("submit",(event) => {
        event.preventDefault();
        const nickname = nickname_form.querySelector("input");
        socket.send(JSON.stringify({
            type:"nickname",
            payload:nickname.value
        }));
    });
    const messageform = document.querySelector("#chat-form");
    messageform.addEventListener("submit", (event) =>{
        event.preventDefault();
        const message = messageform.querySelector("input");
        socket.send(JSON.stringify({
            type:"message",
            payload:message.value
        }));
        message.value = "";
    });
});

socket.addEventListener("message", (message) => {
    const messageList = document.querySelector("ul");
    const listItem = document.createElement('li');
    let str_data = str2json(message.data);
    // console.log(str_data);
    listItem.append(str_data.nickname,":",str_data.message);
    messageList.appendChild(listItem);
} )

socket.addEventListener("error", () => {
    console.log("error!");
} )

socket.addEventListener("close", () => {
    console.log("disconnectd from server");
} )
