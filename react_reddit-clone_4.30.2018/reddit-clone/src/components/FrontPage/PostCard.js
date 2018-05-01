import React from 'react'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card'

const PostCard = ({ title, author, url, imageUrl, score, permalink }) => {
  const cardStyle = {
    width: '70%',
    margin: '20px auto',
  }

  const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'left',
    margin: '0 auto',
    backgroundColor: '#222222',
  }

  const titleStyle = {
    fontSize: '120%',
    color: '#ffffff',
  }

  const subtitleStyle = {
    color: '#bcbcbc',
  }

  const linkStyle = {
    textDecoration: 'none',
  }

  return (
    <Card style={cardStyle}>
      <a href={url} target='_blank' style={linkStyle}>
        <CardHeader
          style={headerStyle}
          title={title}
          titleStyle={titleStyle}
          subtitle={author}
          subtitleStyle={subtitleStyle}
          avatar={
            <Avatar
              size={40}
              style={{ fontSize: '80%' }}
            >
              {score}
            </Avatar>
          }
        />
      </a>
      <CardMedia>
        <img src={imageUrl} alt='preview image'/>
      </CardMedia>
      <CardText>
        <a href={`http://www.reddit.com/${permalink}`} target='_blank' style={linkStyle}>
          <FlatButton
            label='Comments'
          />
        </a>
      </CardText>
    </Card>
  )
}

export default PostCard
