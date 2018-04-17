import React, { Component } from 'react';
import Login from './components/Login'
import Chat from './components/Chat'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      clientUser: {},
      conversations: [],
      selectedConversation: {
        id: '',
        name: '',
        username: '',
        contactInfo: {
          phone: '',
          email: '',
          location: ''
        }
      },
      messageList: [],
      message: '',
    }

    this.login = this.login.bind(this)
    this.selectConversation = this.selectConversation.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentWillMount() {
    this.fetchUsers()
  }

  render() {
    return (
      <div className="App">
              {(!this.state.clientUser.username)
                ? <Login
                    clientUser = {this.state.clientUser}
                    login = {this.login}
                  />
                : <div className='userMenuBtn'
                       onClick={this.logout}>
                    <i className="fa fa-user-circle"></i>
                    <p>{this.state.clientUser.username}</p>
                  </div>
              }
              <div id="chat-container">
                <div className="conversations">
                  <i className="fa fa-plus-square-o add-conversation"
                    aria-hidden="true"
                  />
                <div id="conversation-data">
                  {this.displayConversations()}
                </div>
                </div>
                <div className="messaging-container">
                  <div id="msgs" className="messages">
                    <Chat messages={this.state.messageList}
                          clientUser={this.state.clientUser}
                          selectedConversation={this.state.selectedConversation}/>
                  </div>
                  <form id="message-form"
                        className="input-container"
                        onSubmit={this.sendMessage}
                    >
                    <input id="message-input"
                           type="text"
                           placeholder="Message"
                           name='message'
                           value={this.state.message}
                           onChange={this.handleInputChange}/>
                    <i className="fa fa-comment send-btn" aria-hidden="true" ></i>
                  </form>
                </div>
                <div id="contactInfo-side" >
                  <div className="nameContainer">
                    <div className="contactMenu">
                       {/*this.state.selectedConversation */}
                    </div>
                    <h2 id="contactName">
                      {this.state.selectedConversation.name}
                    </h2>
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

   if (this.state.clientUser.username) {
     usersArray.map(user => {
       if (this.state.clientUser.username !== user.username) {
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
       }
       return 1
     })
   }

   return conversationsElements
  }

  handleInputChange(e) {
    const {name, value} = e.target
    this.setState({ [name]: value })
  }

  // create fetchUsers function
  fetchUsers() {
     fetch('http://localhost:3030/users')
       .then(data => {
         return data.json()
       })
       .then(users => {
         this.setState({
           conversations: users,
         })
       })
       .catch(error => {
         alert(error)
       })
   }

  // create fetchMessages function
  fetchMessages() {
      fetch('http://localhost:3030/messages')
        .then(data => {
          return data.json()
        })
        .then(messages => {
          this.setState({
            messageList: [...messages]
          }, () => console.log(messages))
        })
        .catch(err => alert('fetching messages failed: ' + err))
    }

  sendMessage(e) {
    e.preventDefault()
    console.log(this.state.clientUser)
    fetch('http://127.0.0.1:3030/messages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: this.state.clientUser.id,
        recipient: this.state.selectedConversation.id,
        message: this.state.message,
        created_on: new Date(),
      })
    })
    .then(data => {
      return data.json()
    })
    .then(message => {
      this.setState({ message: '' })
      return this.fetchMessages()
    })
    .catch(err => alert('failed to post message: ' + err))
  }

  selectConversation(user) {
    this.setState({
      selectedConversation: user
    }, () => console.log(this.state))
  }

  login(username) {
    for (var user in this.state.conversations) {
      if (username === this.state.conversations[user].username) {
        return this.setState({
          clientUser: this.state.conversations[user]
        }, () => {
          console.log(this.state)
          this.fetchMessages()
        })
      }
    }

    return alert('no user found')
  }

  logout() {
    this.setState({
      clientUser: {},
      selectedConversation: {
        id: '',
        name: '',
        username: '',
        contactInfo: {
          phone: '',
          email: '',
          location: ''
        }
      },
      messageList: [],
      message: '',
     })
  }
}

export default App;
