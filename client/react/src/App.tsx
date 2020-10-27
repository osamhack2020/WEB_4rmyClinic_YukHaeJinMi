import React from 'react';
import './App.scss';


import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';

import { Main, NotFound, Posts, Profile, SignIn, SignUp, About, Counselors, Counselor, Counsel, CounselList, MyPage, NewPost, Post, UpdatePost } from './Routes';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AuthContextProvider from "./Components/AuthContextProvider";

interface WithFooterProps {
  component?: React.ReactNode
}
function WithFooter(props: WithFooterProps) {
  return (
    <div>
      {props.component}
      <Footer />
    </div>
  )
}


function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" render={(props) => <WithFooter component={<Main {...props} />} />} />
          <Route path="/about" render={(props) => <WithFooter component={<About {...props} />} />} />
          <Route path="/signin" render={(props) => <WithFooter component={<SignIn {...props} />} />} />
          <Route path="/signup" render={(props) => <WithFooter component={<SignUp {...props} />} />} />
          <Route path="/profile/:id" render={(props) => <WithFooter component={<Profile {...props} />} />} />
          <Route path="/mypage" render={(props) => <WithFooter component={<MyPage {...props} />} />} />
          <Route path="/counselors" render={(props) => <WithFooter component={<Counselors {...props} />} />} />
          <Route path="/counselor/:id" render={(props) => <WithFooter component={<Counselor {...props} />} />} />
          <Route path="/counsel/:id" render={(props) => <Counsel {...props} />} />
          <Route path="/counsellist" render={(props) => <WithFooter component={<CounselList {...props} />} />} />
          <Route path="/posts" render={(props) => <WithFooter component={<Posts {...props} />} />} />
          <Route path="/post/:id" render={(props) => <WithFooter component={<Post {...props} />} />} />
          <Route path="/newpost" render={(props) => <WithFooter component={<NewPost {...props} />} />} />
          <Route path="/updatepost/:id" render={(props) => <WithFooter component={<UpdatePost {...props} />} />} />
          <Route path="*" render={(props) => <WithFooter component={<NotFound {...props} />} />} />
        </Switch>

      </Router>
    </AuthContextProvider>
  );
}

export default App;