  var user = prompt('Yo name');
  var socket = io.connect('http://localhost:8080/');
  var $ul = document.getElementsByTagName('ul');


  socket.on('messages', function (data) {
    var $li = document.createElement('li');
    $li.innerHTML = user + ': ' + data;
    $ul[0].appendChild($li);
  });

  user.length && socket.emit('joinChatRoom', user);




  function testing() {
    var $input = document.querySelector('.input'), inputValue = $input.value;
    socket.emit('messages', inputValue);
  }








