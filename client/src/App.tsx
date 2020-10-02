import React from 'react';
import './App.scss';


import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';

import { Main, NotFound, Post, Profile, SignIn, SignUp, About } from './Routes';
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Header />
      
      <Switch>
        <Route exact path="/" render={(props) => <Main {...props} />} />
        <Route path="/post/:id" render={(props) => <Post {...props} />} />
        <Route path="/About" render={(props) => <About {...props} />} />
        <Route path="/signin" render={(props) => <SignIn {...props} />} />
        <Route path="/signup" render={(props) => <SignUp {...props} />} />
        <Route path="/profile/:id" render={(props) => <Profile {...props} />} />
        <Route path="*" render={(props) => <NotFound {...props} />} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;