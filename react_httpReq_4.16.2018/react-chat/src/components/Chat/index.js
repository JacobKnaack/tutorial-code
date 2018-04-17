// create chat component to handle displaying messages
import React from 'react'
import PropTypes from 'prop-types'

class Chat extends React.Component {
  render() {
    const messages = [<p key='message prompt'>Your conversation with {this.props.selectedConversation.username}:</p>]
    this.props.messages.map(message => {
      if ( (message.recipient === this.props.selectedConversation.id || message.sender === this.props.selectedConversation.id) && (message.recipient === this.props.clientUser.id || message.sender === this.props.clientUser.id) ) {
        if (message.sender === this.props.clientUser.id) {
          messages.push(
            <div className='message sender' key={message.created_on}>
              <i className='fa fa-user' aria-hidden='true'></i>
              <p>{message.message}</p>
            </div>
          )
        } else {
          messages.push(
            <div className='message' key={message.created_on}>
              <i className='fa fa-user' aria-hidden='true'></i>
              <p>{message.message}</p>
            </div>
          )
        }
      }

      return false
    })

    return (
      <div className='chat'>
        {this.props.selectedConversation.id.length > 0
          ? messages
          : <h3>Please select a conversation</h3>}
      </div>
    )
  }
}

Chat.propTypes = {
  messages: PropTypes.array,
  clientUser: PropTypes.object,
  selectedConversation: PropTypes.object
}

export default Chat
