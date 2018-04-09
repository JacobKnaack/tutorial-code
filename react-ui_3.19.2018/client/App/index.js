const rootElement = document.getElementById('root');
const socket = io();

// Out stateless app component for intatiating our react application
const App = () => {
  return (
    <div id='app'>

      <div id='heading'>
        <div id='titleContainer'>
          <div className='online'/>
          <h1 id='headingTitle'>Philbot</h1>
        </div>
      </div>

      <QueryContainer />
    </div>
  )
};

ReactDOM.render(<App />, rootElement);
