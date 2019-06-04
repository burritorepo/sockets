const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let usersConnected = [];

app.use(express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function (req, res) {
  res.sendFile(__dirname + '/chat.html');
});

app.get('/chat/:user', function (req, res) {
  res.sendFile(__dirname + '/chat-user.html');
});


io.on('connection', function (socket) {
  socket.on('disconnect', function () {
  });

  socket.on('chanel_messages', function (message) {
    //  socket.broadcast.emit('message', obj);
    io.emit('chanel_messages', message);
  })

  socket.on('chanel_add_users', function (user) {
    usersConnected.push(user);

    const userFiltered = usersConnected.reduce((acc, current) => {
      const x = acc.find(item => item.user === current.user);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    io.emit('chanel_add_users', userFiltered);
  })

  socket.on('chanel_remove_user', function(user) {
    console.log('usersConnected', usersConnected)
    const userFiltered = usersConnected.filter(item => item.user !== user.user);
    console.log('userFiltered', userFiltered)
    io.emit('chanel_remove_user', userFiltered);
  })


  socket.on('chat_detail', function(obj) {
    io.emit('chat_detail', obj);
    console.log('obj detail', obj)
  })
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});

