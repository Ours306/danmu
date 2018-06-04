var app = require('http').createServer(handler)
var io = require('socket.io')(app, {
	transports: ['websocket', 'polling']
});
var fs = require('fs');

app.listen(80, function() {
  console.log("服务端运行")
});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

let array = [];
let admin;

io.on('connection', function (socket) {
  console.log("有人连接了");
  array.push(socket.id);

  socket.emit('server', { hello: 'world' });//向所有客户端发送消息

  sendOnlineNumber(socket);//向唯一主机发送在线人数

  socket.on('main', function(data) {//监听来自唯一主机的消息,并将其设为admin
    if(data.isAdmin) {
      admin = socket;
    }
  })

  socket.on('client', function (data) {//监听客户端发送的消息
    console.log(data);
  });

  socket.on('disconnect', (reason) => {//断开连接时需要将其从数组中移除
    console.log(socket.id + "断开连接了，原因是:" + reason)

    if(admin === socket) {
      admin = null;
    }

    let index = array.findIndex((value, index, array) => {
      return value === socket.id;
    })

    array.splice(index, 1);
  })
});

function sendOnlineNumber(socket) {
  socket.emit('onlinenumber', {number: array.length})
}