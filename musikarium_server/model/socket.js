// socket.io

function socket(io) {
  io.sockets.on('connection', function(socket){
    console.log("connected!!!!!!!");
    socket.on('connected', function (key) {
      io.sockets.emit('sound', {value: 'yes'});
    });
  });
}

module.exports = socket;
// io.on('event', function(data){ console.log("event!!!!!!!!!!!!"); });
// io.on('disconnect', function(){ console.log("disconnected!!!!!!"); });
