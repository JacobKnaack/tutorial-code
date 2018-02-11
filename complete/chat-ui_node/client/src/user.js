var User = {}

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
  User = userObject
};

function toggleLoginForm() {
  var modalForm = document.querySelector(".loginForm.hidden");
  var formEl = document.getElementById('login');

  if (modalForm) {
    modalForm.classList.remove("hidden");
  } else {
    formEl.classList.add("hidden");
    document.getElementById("conversationForm").reset();
    document.getElementById('searchResults').innerHTML = "";
  }
}


window.addEventListener('DOMContentLoaded', function() {
  console.log(User);
  if(!User.id) {
    toggleLoginForm();
  } 

  document.querySelector('#loginForm-el').addEventListener('submit', function(event){
    event.preventDefault();
  }, false);
});

