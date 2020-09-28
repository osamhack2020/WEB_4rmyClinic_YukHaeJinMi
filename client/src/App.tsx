import React from 'react';
import './App.scss';
import logo from './logo2.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { Main, NotFound, Post, Profile, SignIn, SignUp , About } from './Routes';

function App() {
  return (
    <Router>
      <header>
        <div className="menu-wrapper">
          <div className="header-logo">
            <Link to="/">
              <img src={logo} alt = "logo" className = "logo"/>
            </Link>
          </div>
          <div className="menu-holder">
            <nav className="menu-container">
              <ul className="menu-ul">
                <Link to="/">Home</Link>
                <Link to="/About">About</Link>
                <Link to="/">Counseler</Link>
                <Link to="/post/:id">Community</Link>
                <Link to="/profile/:id">profile</Link>
              </ul>
            </nav>
          </div>
          <div className="clear"></div>
        </div>
      </header>

      <Switch>
        <Route exact path="/" render={(props) => <Main {...props} />} />
        <Route path="/post/:id" render={(props) => <Post {...props} />} />
        <Route path="/About" render={(props) => <About {...props} />} />
        <Route path="/signin" render={(props) => <SignIn {...props} />} />
        <Route path="/signup" render={(props) => <SignUp {...props} />} />
        <Route path="/profile/:id" render={(props) => <Profile {...props} />} />
        <Route path="*" render={(props) => <NotFound {...props} />} />
      </Switch>

      <footer>footer</footer>
    </Router>
  );
}

export default App;