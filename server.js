


const io = require("socket.io")(3000, {
    cors: {
        origin: "*", // Allow all origins for testing, but restrict in production
        methods: ["GET", "POST"]
    }
});


const users = {};

io.on('connection', socket => {
    // Handle new user connection
    socket.on('new user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user connected', name);
    });

    // Send a test message to the connected user
    socket.emit('chat-message', 'hello world');

    // Handle sending chat messages
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {
            message: message,
            name: users[socket.id]
        });
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnected', users[socket.id]);
        delete users[socket.id];
    });
});
