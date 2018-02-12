function login(callback) {
  var input = document.getElementById('usernameInput').value;

  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200)
      callback(request.response);
    }
  request.open("POST", 'http://localhost:3000/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: input}));
}

function logout(callback) {
  var id = JSON.parse(localStorage.getItem('PurpleChatUser')).id;

  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200)
      console.log(request.response);
      callback(request.response);
   }
  request.open("DELETE", `http://localhost:3000/logout/${id}`, true);
  request.send(null);
}

function setUser(userObject) {
  localStorage.setItem('PurpleChatUser', userObject);
  console.log('User Set: ', localStorage.getItem('PurpleChatUser'));

  authCheck();
};

function removeUser(res) {
  var UserLog = localStorage.getItem('PurpleChatUser');
  if (UserLog) {
    localStorage.removeItem('PurpleChatUser');
  }
  console.log('User Removed');
  authCheck();
};

function authCheck() {
  var userInfo = document.getElementById('userInfo');
  var formEl = document.getElementById('loginContainer');
  var UserLog = localStorage.getItem('PurpleChatUser');

  if (UserLog) {
    userInfo.classList.remove("hidden");
    document.getElementById('userInfo-username').innerHTML = JSON.parse(UserLog).userName;
    formEl.classList.add('hidden');
    document.getElementById("loginForm-el").reset();
  } else {
    formEl.classList.remove('hidden');
    userInfo.classList.add('hidden');
  }
}


window.addEventListener('DOMContentLoaded', function() {

  authCheck();

  document.querySelector('#loginForm-el').addEventListener('submit', function(event){
    event.preventDefault();
  }, false);
});

