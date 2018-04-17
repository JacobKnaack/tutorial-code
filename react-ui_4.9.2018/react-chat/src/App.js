import React, { Component } from 'react';
import Login from './components/Login'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      conversations: [],
      clientUser: {},
    }

    this.fetchData = this.fetchData.bind(this)
    this.login = this.login.bind(this)
  }

  componentWillMount() {
    this.fetchData()
  }

  render() {
    return (
      <div className="App">
        {(!this.state.clientUser.userName)
          ? <Login
              clientUser = {this.state.clientUser}
              login = {this.login}
            />
          : <div className='userMenuBtn'
                 onClick={this.logout}>
              <i className="fa fa-user-circle"></i>
              <p>{this.state.clientUser.userName}</p>
            </div>
        }
        <div id="chat-container">
           <div className="conversations">
             <i className="fa fa-plus-square-o add-conversation"
               aria-hidden="true"
             />
           <div id="conversation-data">
             { this.displayConversations() }
           </div>
           </div>
           <div className="messaging-container">
             <div id="msgs" className="messages">
               {/*this.state.messageList*/}
             </div>
             <form id="message-form"
                   className="input-container"
                   onSubmit={(e) => this.sendMessage(e, {
                     message: {
                       userId: this.state.clientUser.id,
                       content: this.state.message,
                       recipient: this.state.selectedConversation.id,
                     }
                   })
                 }
               >
               <input id="message-input" type="text" placeholder="Message"  />
               <i className="fa fa-comment send-btn" aria-hidden="true" ></i>
             </form>
           </div>
           <div id="contactInfo-side" >
             <div className="nameContainer">
               <div className="contactMenu">
                  {/*this.state.selectedConversation */}
               </div>
               <h2 id="contactName"></h2>
               <div id="contactInfo-side-text">
                 {/* this.state.selectedConversation */}
               </div>
             </div>
           </div>
         </div>

         <div id="conversationFormContainer" className="form hidden">
           <form id="conversationForm" className="modalForm">
             <input id="searchField"
               type="text"
               placeholder="Search for users: "
             />
             <div id="searchResults"></div>
             <div className="btns">
               <input className="searchBtn" type="button" value="close" />
             </div>
           </form>
         </div>
      </div>
    );
  }

  displayConversations() {
   const usersArray = this.state.conversations
   const conversationsElements = []

   // if (this.state.clientUser.userName) {
     usersArray.map(user => {
       // if (this.state.clientUser.userName !== user.userName) {
         conversationsElements.push(
           <div key={user.id}
                id={user.id}
                className='chat-item'
                onClick={() => this.selectConversation(user)}>
             <i className='fa fa-user' aria-hidden='true'></i>
             <p>{user.name}</p>
             <div id='contactInfo-small'>
               <i className='fa fa-phone' aria-hidden='true'></i>
               <i className='fa fa-envelope' aria-hidden='true'></i>
               <i className='fa fa-map-marker' aria-hidden='true'></i>
             </div>
           </div>
         )
       // }
       return 1
     })
   // }

   return conversationsElements
 }

  fetchData() {
    fetch('./db.json')
    .then(data => {
      return data.json()
    })
    .then(object => {
      this.setState({
        conversations: object.users
      },() => {
        console.log(this.state)
      })
    })
    .catch(error => {
      alert(error)
    })
  }

  login(userName) {
    for ( var user in this.state.conversations ) {
      if (userName === this.state.conversations[user].userName) {
        this.setState({
          clientUser: this.state.conversations[user]
        }, () => console.log(this.state))
      }
    }
  }
}

export default App;
