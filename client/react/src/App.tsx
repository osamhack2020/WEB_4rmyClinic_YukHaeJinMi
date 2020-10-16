import React from 'react';
import './App.scss';


import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';

import { Main, NotFound, Posts, Profile, SignIn, SignUp, About, Counselors, Counselor, MyPage, NewPost, Post } from './Routes';
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
          <Route path="/about" render={(props) => <About {...props} />} />
          <Route path="/signin" render={(props) => <SignIn {...props} />} />
          <Route path="/signup" render={(props) => <SignUp {...props} />} />
          <Route path="/profile/:id" render={(props) => <Profile {...props} />} />
          <Route path="/mypage" render={(props) => <MyPage {...props} />} />
          <Route path="/counselors" render={(props) => <Counselors {...props} />} />
          <Route path="/counselor/:id" render={(props) => <Counselor {...props} />} />
          <Route path="/posts" render={(props) => <Posts {...props} />} />
          <Route path="/post/:id" render={(props) => <Post {...props} />} />
          <Route path="/newpost" render={(props) => <NewPost {...props} />} />
          <Route path="*" render={(props) => <NotFound {...props} />} />
        </Switch>

        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;