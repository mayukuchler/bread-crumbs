import React, { Component } from 'react';
import "./Signup.css";
import "../../js/Main.js";
import moment from 'moment'




class Signup extends Component {
  render() {
    return (
      <div class="App">
        <div className="welcome">Sign Up</div>
        <section class="alert"></section>

<form action="/signup" method="post">
        <label>Email</label>
        <input type="text" class="" name="email" />
        <label>Password</label>
        <input type="password" class="form-control" name="password" />
    <button type="submit" class="">Signup</button>
</form>
<br />
<p>Already have an account? <a href="/login">Login</a></p>
<p>Go <a href="/">Home</a>.</p>
    </div>
    // </div>
    );
  }
}

export default Signup;