var app = require('http').createServer(handler)
var io = require('socket.io')(app, {
	transports: ['websocket', 'polling']
});
var fs = require('fs');

app.listen(80, function() {
  console.log("服务端运行")
});

function handler (req, res) {
  let path = req.url;
  console.log(path)
  fs.readFile(__dirname +  path,
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
  console.log('有人连接了')
  array.push(socket)//将socket推入数组中,方便统计在线人数

  sendOnlineNumber();//每当有人连接时,将在线人数发送出去
  socket.emit('toClient', {hello: 'world'});//向新连接的客户端发送消息

  socket.on('beAdmin', function(data) {//监听来自客户端的消息，如果发送了beAdmin，那么它是admin
    if(data.isAdmin) {
      admin = socket;
      array.splice(array.findIndex(val => val === socket), 1);
    }
    socket.emit('toAdmin', {msg: '认证为admin成功!'})//向admin返回一条认证消息
    sendOnlineNumber();
  })

  socket.on('toServer', function(data) {//监听发送给服务器的所有消息
    console.log(data);
  })

  socket.on('fowardToAdmin', data => {//监听需要发送给admin的消息，然后转发给admin
    sendToMessage(data)
  })

  socket.on('disconnect',data => {
    array.splice(array.findIndex(val => val === socket), 1);
    if(socket === admin) {
      admin = null;
    }
    console.log('有人离线了,当前在线人数:' + array.length)
    sendOnlineNumber();//有人断开连接,就向admin重发在线人数
  })
});

/**
 * 发送消息
 * @param msg
 */
function sendToMessage(msg) {
  if(admin) {
    admin.emit('toAdmin', msg);
  }
}

/**
 * 发送在线人数
 */
function sendOnlineNumber() {
  if(admin) {
    admin.emit('onlineNumber', {number: array.length})
  }
}