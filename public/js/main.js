const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users');
let title = document.getElementById('title');
let msgInput = document.getElementById('msg').value;

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  // ignore perfix of query
  ignoreQueryPrefix: true
});

const socket = io();
// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
let message_notification = 1;
socket.on('message', message => {
  title.innerHTML = `Meet • Chat (${message_notification++})`;
  // outputing user message
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

const msgNot = () => {
  message_notification = 0;
  title.innerHTML = `Meet • Chat`;
}

// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta" id="metaa">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  div.setAttribute('id', 'message');
  setTimeout(function(){
   div.style.backgroundColor = "transparent"; 
 }, 500);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  usersList.innerHTML = `
    ${users.map(user => `<li name="user_namehh" class="user_name" id="user_name" title="Online" style="padding:15px 20px;">${user.username}`+
      `<span style="color:green;float:right;"> •</span>`+`</li>`).join('')}
  `;
}


// // choose a color randomly
// function generateRandomColor() {
//     var randomColor = '#'+Math.floor(Math.random()*10525267).toString(16);
//     return randomColor;
//     //random color will be freshly served
// }
// document.getElementById("room-name").style.backgroundColor = generateRandomColor();
// // someDiv.style.color = generateRandomColor();

