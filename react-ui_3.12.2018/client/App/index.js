const rootElement = document.getElementById('root');

const App = () => {
  return (
    <div id='app'>
      <MessageContainer />
      <ChatRoom />
    </div>
  )
};

ReactDOM.render( <App />, rootElement);
