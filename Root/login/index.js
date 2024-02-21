let token;
let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
console.log(usernameInput, passwordInput);
if (document.cookie.split('=')[0] == 'token') {
  fetch('https://api.desmos.help/token', {
    method: 'POST',
    body: JSON.stringify({
      token: document.cookie.split('=')[1].split(';')[0],
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.token) {
        token = json.token;
        document.cookie = `token=${token}; path=/`;
        window.location.href = '../manage-rooms/';
      } else {
        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      }
    });
}
usernameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    passwordInput.focus();
  }
});
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    submit(e);
  }
});
const submit = (event) => {
  event.preventDefault();
  fetch('https://api.desmos.help/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.token) {
        token = json.token;
        document.cookie = `token=${token}; path=/`;
        window.location.href = '../manage-rooms/';
        console.log(document.cookie);
      } else {
        console.log(json.error);
      }
    });
};
