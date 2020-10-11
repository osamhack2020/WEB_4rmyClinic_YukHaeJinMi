import React from 'react';
import './App.scss';


import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';

import { Main, NotFound, Post, Profile, SignIn, SignUp, About, Counselors, CsAbout, MyPage } from './Routes';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AuthContextProvider from "./Components/AuthContextProvider";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" render={(props) => <Main {...props} />} />
          <Route path="/post/:id" render={(props) => <Post {...props} />} />
          <Route path="/about" render={(props) => <About {...props} />} />
          <Route path="/signin" render={(props) => <SignIn {...props} />} />
          <Route path="/signup" render={(props) => <SignUp {...props} />} />
          <Route path="/profile/:id" render={(props) => <Profile {...props} />} />
          <Route path="/counselors" render={(props) => <Counselors {...props} />} />
          <Route path="/mypage" render={(props) => <MyPage {...props} />} />
          <Route path="/CsAbout" render={(props) => <CsAbout {...props} />} />
          <Route path="/Counselors" render={(props) => <Counselors {...props} />} />
          <Route path="*" render={(props) => <NotFound {...props} />} />
        </Switch>

        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;