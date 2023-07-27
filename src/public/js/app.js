const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("connectd from server");

    const messageform = document.querySelector("form");
    messageform.addEventListener("submit", (event) =>{
        event.preventDefault();
        const input_message = messageform.querySelector("input");
        socket.send(input_message.value);
        input_message.value = "";
    })
} )

socket.addEventListener("message", (message) => {
    const messageList = document.querySelector("ul");
    const listItem = document.createElement('li');
    listItem.append(message.data);
    messageList.appendChild(listItem);
} )

socket.addEventListener("error", () => {
    console.log("error!");
} )

socket.addEventListener("close", () => {
    console.log("disconnectd from server");
} )
