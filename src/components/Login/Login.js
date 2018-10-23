import React, { Component } from 'react';
import "./Login.css";




class Login extends Component {
  render() {
    return (
      <div class="App">
        <div className="welcome">Login</div>
    <section class="alert"></section>

    <form action="/login" method="post">
            <label>Email</label>
            <input type="text" class="form-control" name="email" />
            <label>Password</label>
            <input type="password" class="form-control" name="password" />
        <button type="submit" class="">Login</button>
    </form>
    <br />
    <div class="login">
    <p>Need an account? <a href="/signup">Sign Up</a></p>
    <p>Go <a href="/">Home</a>.</p>
    </div>
    </div>
    );
  }
}

export default Login;