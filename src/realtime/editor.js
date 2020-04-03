let sockets = {};
let usersByRoom = {};

module.exports = function runSocket(io, passportSocketIo, passport, cookieParser, mongoStore) {
    io.use(passportSocketIo.authorize({
        key: 'connect.sid',
        secret: "secret123",
        passport: passport,
        cookieParser: cookieParser,
        store: mongoStore,
    }));


    io.on('connection', function (socket) {
        let currRoom = socket.request._query.snippetID;
        if (!sockets[socket.request.user._id]) {
            console.log("Client connected");
            socket.room = currRoom;
            sockets[socket.request.user._id] = socket;
        }

        //socket.join(currRoom);


        //console.log(io.sockets.adapter.rooms[currRoom], currRoom);


        //socket.to(currRoom).emit('joined', { users: usersByRoom });

        socket.on('create', function (room) {
            socket.join(room);
            Object.keys(io.sockets.adapter.rooms[currRoom].sockets).forEach(sock => {
                let userByRoom = io.sockets.connected[sock].request.user;
                usersByRoom[userByRoom._id] = userByRoom;
            });

            io.in(room).emit('joined', { users: usersByRoom });
        });

        socket.on('code_emit', function (eventData) {
            socket.broadcast.to(eventData.id).emit("get_code_emit", { value: eventData.value });
        });

        socket.on('language_emit', function (eventData) {
            socket.broadcast.to(eventData.id).emit("get_language_emit", eventData.value);
        });

        socket.on('disconnect', function (eventData) {
            console.log("Client disconnected");
            Object.keys(sockets).forEach(userId => {
                try {
                    let sock = sockets[userId];
                    if (sock.id == socket.id) {
                        delete usersByRoom[userId];
                        sockets[userId] = null;
                        io.in(currRoom).emit('unjoined', { user: userId });
                    }
                } catch (error) {
                    console.log(error, "disconnecting client");
                }
            });
        });
    });
}
