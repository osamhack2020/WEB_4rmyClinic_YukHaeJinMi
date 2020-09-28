import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Main, NotFound, Post, Profile, SignIn, SignUp } from './Routes';
import { QueryRenderer, graphql } from "react-relay";
import { AppQuery } from "./__generated__/AppQuery.graphql";
import environment from "./_lib/environment";
function App() {
  return (
    <Router>
      <header>header</header>
      <QueryRenderer<AppQuery>
        environment={environment}
        variables={{}}
        query={graphql`
          query AppQuery {
            recentPosts(first: 10) {
              edges {
                node {
                  isPrivate
                }
              }
            }
          }
        `}
        render={({ props, error, retry }) => {
          return <div>{error && <div><p>{error.message}</p><p>{"아직 데이터가 없어요."}</p></div>}</div>
        }}
      />
      <Switch>
        <Route exact path="/" render={(props) => <Main {...props} />} />
        <Route path="/post/:id" render={(props) => <Post {...props} />} />
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