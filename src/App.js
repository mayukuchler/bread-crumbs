import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";


// import "./App.css";


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <p>
//             <h1>Welcome</h1>
//             <a href="/login" class="colors">
//               Login
//             </a>
//             <p>
//             <a href="/signup" class="colors">
//               Signup
//             </a>
//             </p>
//           </p>
          
//         </header>
//       </div>
//     );
//   }
// }
const App = () => (
  <Router>
    <div>
    <Route exact path="/" component={Home} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

    </div>
  </Router>
);


// const App = () => (
//   <BrowserRouter>
//     <div>
     
//       <Wrapper>
//         <Route exact path='/' component={Splash} />
//         <Route exact path='/home' component={Splash} />
//         {/* <Route match='/swipe' component={Swipeview} />
//         <Route match='/search' component={Bffsearch} /> */}
//       </Wrapper>
//     </div>
//   </BrowserRouter>
// )
export default App;
