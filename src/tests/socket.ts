import getSocket from "../socket/getSocket";

const socket = getSocket("http://localhost");

socket.on("message", ()=>{
    console.log("socket:message");
});


socket.on("disconnect", ()=>{
    console.log("socket:disconnect");
})


socket.on("connect", ()=>{
    console.log("socket:connect");
})