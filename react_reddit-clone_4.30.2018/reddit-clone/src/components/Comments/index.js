import React from 'react'
import Dialog from 'material-ui/Dialog'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardHeader, CardText } from 'material-ui/Card';

class Comments extends React.Component {
  constructor() {
    super()
    this.state = {
      commentData: [],
      commentsLoaded: false,
    }

    this.closeComments = this.closeComments.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.commentLink !== this.props.commentLink && nextProps.commentLink !== null) {
      fetch(`http://www.reddit.com/${nextProps.commentLink}/.json`)
        .then(data => data.json())
        .then(comments => {
          this.setState({
            commentData: comments[1].data.children,
            commentsLoaded: true,
          })
        })
        .catch(error => alert('fetch comments failed'))
    }
  }

  render() {
    return (
      <Dialog
        className='comments'
        modal={false}
        autoScrollBodyContent={true}
        open={this.props.open}
        onRequestClose={this.closeComments}
      >
        {!this.state.commentsLoaded
          ? <p>Loading Comments...</p>
          : null
        }
        {this.state.commentData.map(comment => {
          if(comment.kind !== 'more') {
            return (
              <Card key={comment.data.id} style={{margin: '10px 0'}}>
                <CardHeader
                  title={comment.data.author}
                  subtitle={comment.data.created}
                  avatar={
                    <Avatar
                      style={{fontSize: '80%'}}
                    >
                      {comment.data.score}
                    </Avatar>
                  }
                />
                <CardText>
                  {comment.data.body}
                </CardText>
              </Card>
            )
          }

          return (
            <RaisedButton
              label='more comments'
              secondary={true}
            />
          )
        })}
      </Dialog>
    )
  }

  closeComments() {
    this.setState({
      commentData: [],
      commentsLoaded: false
    }, () => {
      this.props.closeComments(null)
    })
  }
}

export default Comments
