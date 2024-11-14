// const socket=io('http://localhost:3000')
// const messageform=document.getElementById('send-container')

// const messagecontainer=document.getElementById('message-container')
// const messageinput=document.getElementById('message-input')
// const name=prompt('what is yiour name')
// appendmessage('you joined')
// socket.emit('new user',name)
// socket.on('chat-message',data=>{
//     appendmessage(`${data.name}:${data.message}`);

// })
// socket.on('user-connected',name=>{
//     appendmessage(`${name} connected`);

// })

// messageform.addEventListener('submit', e =>{
// e.preventDefault()
// const message=messageinput.value
// appendmessage(`you:${message}`);
// socket.emit('send-chat-message',message)
// messageinput.value=''
// })

// function appendmessage(message){
//     const messageElement=document.createElement('div')
//     messageElement.innerHTML=message
//     messagecontainer.append(messageElement)
// }

const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');

// Prompt for username and notify others upon joining
const name = prompt('What is your name?');
appendMessage('You joined');
socket.emit('new user', name);

// Listen for chat messages from the server
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

// Notify when a new user connects
socket.on('user connected', name => {
    appendMessage(`${name} connected`);
});

// Notify when a user disconnects
socket.on('user disconnected', name => {
    appendMessage(`${name} disconnected`);
});

// Send message on form submit
messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

// Helper function to append messages to the message container
function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageContainer.append(messageElement);
}
