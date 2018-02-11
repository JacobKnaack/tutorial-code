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

function setUser(userObject) {
  localStorage.setItem('PurpleChatUser', userObject);
  console.log('User Set: ', localStorage.getItem('PurpleChatUser'));
};

function authCheck() {
  var modalForm = document.querySelector(".loginForm.hidden");
  var formEl = document.getElementById('loginContainer');
  var UserLog = localStorage.getItem('PurpleChatUser');

  if (UserLog) {
    document.getElementById('userInfo-username').innerHTML = JSON.parse(UserLog).userName;    
    if (modalForm) {
      modalForm.classList.remove("hidden");
    } else {
      formEl.classList.add("hidden");
      document.getElementById("loginForm-el").reset();
    }
  }
}


window.addEventListener('DOMContentLoaded', function() {

  authCheck();

  document.querySelector('#loginForm-el').addEventListener('submit', function(event){
    event.preventDefault();

    authCheck();
  }, false);
});

