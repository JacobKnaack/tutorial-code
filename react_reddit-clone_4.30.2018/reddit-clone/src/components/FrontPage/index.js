import React from 'react'
import PostCard from './PostCard'

class FrontPage extends React.Component {
  render() {
    return(
      <div className='frontPage'>
        {this.props.redditPosts.map(post => {
          let imageUrl = 'https://image.flaticon.com/icons/svg/149/149930.svg'
          if (post.data.preview) {
            imageUrl = post.data.preview.images[0].source.url
          }

          return (
            <PostCard
              key={post.data.title}
              title={post.data.title}
              author={post.data.author}
              url={post.data.url}
              imageUrl={imageUrl}
              score={post.data.score}
              permalink={post.data.permalink}
            />
          )
        })}
      </div>
    )
  }
}

export default FrontPage
