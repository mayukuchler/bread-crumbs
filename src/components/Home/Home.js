import React, { Component } from 'react';
import "./Home.css";

// import HomeText from './HomeText';

class Home extends Component {
  render() {
    return (
      <div className="App">
   {/* <header className="App-header" /> */}
        {/* <p> */}
            <div className="welcome">Welcome</div>
            <p>
            <a href="/login" >
              Login
            </a>
            </p>
            <p>
            <a href="/signup" >
              Signup
            </a>
          </p>
      </div>

    );
  }
}

export default Home;