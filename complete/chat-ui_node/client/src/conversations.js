function getUsers(callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200)
      callback(request.response);
  }
  request.open("GET", 'http://localhost:3000/mockUsers/', true);
  request.send(null);
};

function toggleConversationForm() {
  var modalForm = document.querySelector(".conversationForm.hidden");
  var formEl = document.getElementById("conversationFormContainer");

  if(modalForm) {
    modalForm.classList.remove("hidden");
  } else {
    formEl.classList.add("hidden");
    document.getElementById("conversationForm-el").reset();
    document.getElementById('searchResults').innerHTML = "";
  }
}

function addConversation(id) {
  var users = JSON.parse(localStorage.getItem('PurpleChatUsers'));
  var menuEls = "";

  for (var user in users) {
    if (users[user].id === parseInt(id)) {
      menuEls += "<div id="+ users[user].id +" class=chat-item onclick='selectChat(\"" + users[user].id +"\")'><i class='fa fa-user' aria-hidden='true'></i> " + users[user].userName + "<div id='contactInfo-small'><i class='fa fa-phone' aria-hidden='true'></i><i class='fa fa-envelope' aria-hidden='true'></i><i class='fa fa-map-marker' aria-hidden='true'></i></div></div>";
      selectChat(users[user].id);
    }
    document.getElementById("conversation-data").innerHTML = menuEls;
  }
  toggleConversationForm();
}

function selectChat(id) {
  let users = JSON.parse(localStorage.getItem('PurpleChatUsers'));

  for (var user in users) {
    if (users[user].id === parseInt(id)) {
      localStorage.setItem('SelectedPurpleChat', JSON.stringify(users[user]));
      console.log('chat selected: ', users[user]);
    }
  }
}

window.addEventListener("DOMContentLoaded", function(){
  getUsers(function(Users) {
    localStorage.setItem("PurpleChatUsers", Users)
    let UserObject = JSON.parse(Users);

    document.getElementById("searchField").addEventListener("input", function (e) {
      document.getElementById("searchResults").innerHTML = "";
      for ( var item in UserObject ) {
        if ( UserObject[item].userName.toLowerCase().includes(this.value.toLowerCase()) ) {
          document.getElementById("searchResults").innerHTML += "\
            <p class='usersResult' onclick='addConversation(\"" + UserObject[item].id +"\")'>"
               + UserObject[item].userName +
            "</p>"
        }
        if ( document.getElementById("searchField").value.length == 0) {
          document.getElementById("searchResults").innerHTML = "";
        } 
      }
    });

  });

});
