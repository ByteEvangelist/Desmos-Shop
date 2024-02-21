let token;
let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;

const submit = async (event) => {
  event.preventDefault();
  fetch('https://api.desmos.help/register', {
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
      }
    });
};
