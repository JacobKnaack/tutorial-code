import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      conversations: [],
      clientUser: '',
      selectedConversation: {},
      message: '',
      messageList: [],
      username: '',
    }
  }

  componentWillMount(){
    this.fetchUsers()
  }

  render() {
    return (
      <div className="app">
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
              {/*this.state.messageList*/}
            </div>
            <form id="message-form" className="input-container">
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

    usersArray.map(user => {
      conversationsElements.push(
        <div key={user.id} id={user.id} className='chat-item'>
          <i className='fa fa-user' aria-hidden='true'></i>
          <p>{user.name}</p>
          <div id='contactInfo-small'>
            <i className='fa fa-phone' aria-hidden='true'></i>
            <i className='fa fa-envelope' aria-hidden='true'></i>
            <i className='fa fa-map-marker' aria-hidden='true'></i>
          </div>
        </div>
      )
    })

    return conversationsElements
  }

  fetchUsers() {
    fetch('./db.json')
      .then(data => {
        return data.json()
      })
      .then(json => {
        this.setState({
          conversations: json.users
        })
      })
      .catch(error => {
        alert(error)
      })
  }
}

export default App;
