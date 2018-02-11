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

function addConversation() {
  // function for adding conversation elements to the conversation containers
}

window.addEventListener("DOMContentLoaded", function(){
  getUsers(function(Users) {
    let UserObject = JSON.parse(Users);

    document.getElementById("searchField").addEventListener("input", function (e) {
      document.getElementById("searchResults").innerHTML = "";
      for ( var item in UserObject ) {
        if ( UserObject[item].userName.toLowerCase().includes(this.value.toLowerCase()) ) {
          document.getElementById("searchResults").innerHTML += "\
            <p class='usersResult' onclick='addUser(\"" + UserObject[item].id +"\")'>"
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
