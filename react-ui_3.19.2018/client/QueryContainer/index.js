class QueryContainer extends React.Component {

  // Our first constructor 
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  render() {
    return (
      <div className='queryContainer'>
        <div className='queryResponses'>

        </div>
        <div className='userInput'>
          <form>
            <input
              type='text'
              name='query'
              value={this.state.query}
              onChange={(e) => this.handleInputChange(e)}
            />
            <input
              id='formSubmit'
              type='submit'
            />
          </form>
        </div>
      </div>
    )
  }

  handleInputChange(e) {
    this.setState({
        query: e.target.value
    })
  }
}
