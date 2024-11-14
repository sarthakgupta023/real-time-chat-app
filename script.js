const socket=io('http://localhost:3000')
const messageform=document.getElementById('send-container')

const messagecontainer=document.getElementById('message-container')
const messageinput=document.getElementById('message-input')
const name=prompt('what is yiour name')
appendmessage('you joined')
socket.emit('new user',name)
socket.on('chat-message',data=>{
    appendmessage(`${data.name}:${data.message}`);

})
socket.on('user-connected',name=>{
    appendmessage(`${name} connected`);

})

messageform.addEventListener('submit', e =>{
e.preventDefault()
const message=messageinput.value
appendmessage(`you:${message}`);
socket.emit('send-chat-message',message)
messageinput.value=''
})

function appendmessage(message){
    const messageElement=document.createElement('div')
    messageElement.innerHTML=message
    messagecontainer.append(messageElement)
}