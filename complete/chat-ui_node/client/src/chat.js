function getMessages(recipient_id, creator_id, callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200)
      callback(request.response);
  }
  request.open("GET", `http://localhost:3000/mockMessages/to${recipient_id}/from${creator_id}`, true);
  request.send(null);
}


window.addEventListener('DOMContentLoaded', function() {
  getMessages(1, 2, function (messages) {
    let appMessages = JSON.parse(messages);
    var displayedMessages = document.getElementById('msgs');

    if (appMessages.length === 0) {
      displayedMessages.innerHTML = "<h2 class='noMessages'>No Messages to display</h2>"
    } else {
      var messageEls = "";
        for (var message in appMessages) {
          if ( appMessages[message].id === 1 ) {
            messageEls += "<div id=" + appMessages[message].sender + " class='message'> <i class='fa fa-user' aria-hidden='true'></i><p>" + appMessages[message].message_body + "</p></div>"
          } 
        } 
      displayedMessages.innerHTML = messageEls;
    }
  })

})