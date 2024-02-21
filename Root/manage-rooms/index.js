let token = document.cookie.split('=')[1].split(';')[0];
let rooms = document.getElementById('rooms');
console.log(token);

const logOut = () => {
  document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  window.location.href = '../';
};

let roomNameInput = document.getElementById('roomName');
let roomPasswordInput = document.getElementById('roomPassword');

const getRooms = () => {
  fetch('https://api.desmos.help/rooms', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      rooms.innerHTML = '';
      json.forEach((element) => {
        let room = document.createElement('div');
        let name = document.createElement('p');
        name.innerHTML = element.name;
        let roomnameIdentifier = document.createElement('p');

        roomnameIdentifier.innerHTML = 'Name:';
        roomnameIdentifier.style.fontWeight = 'bold';
        room.appendChild(roomnameIdentifier);
        room.appendChild(name);
        let hasPasswordIdentifier = document.createElement('p');
        hasPasswordIdentifier.innerHTML = 'Has Password:';
        hasPasswordIdentifier.style.fontWeight = 'bold';
        room.appendChild(hasPasswordIdentifier);
        let hasPassword = document.createElement('p');
        hasPassword.innerHTML = `${element.hasPassword}`;
        room.appendChild(hasPassword);
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.style.height = '30px';
        room.appendChild(deleteButton);
        deleteButton.onclick = () => {
          deleteRoom(element.name);
        };
        room.style.border = '1px solid black';
        room.style.width = '100%';
        room.style.display = 'flex';
        room.style.flexDirection = 'row';
        room.style.justifyContent = 'space-between';
        room.style.padding = '10px';
        room.style.alignItems = 'center';
        room.style.boxSizing = 'border-box';
        room.style.borderRadius = '25px';
        room.style.margin = '10px 0';
        rooms.appendChild(room);
      });
    });
};

const deleteRoom = (roomName) => {
  fetch('https://api.desmos.help/deleteRoom', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      roomName: roomName,
    }),
  })
    .then((response) => response.text())
    .then((text) => {
      console.log(text);
      getRooms();
    });
};

const newRoom = async () => {
  fetch('https://api.desmos.help/newRoom', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      roomName: roomNameInput.value,
      hasPassword: roomPasswordInput.value === '' ? false : true,
      roomPassword: roomPasswordInput.value,
    }),
  })
    .then((response) => response.text())
    .then((text) => {
      if (text === 'room created') {
        roomNameInput.value = '';
        roomPasswordInput.value = '';
      }
    })
    .then(() => {
      getRooms();
    });
};

getRooms();
