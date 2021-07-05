import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from 'react-redux'
import { GlobalStyles } from "./GlobalStyles";
import MainNav from "./components/MainNav";
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import Lobby from "./pages/Lobby"
import Studylog from "./pages/Studylog";
import MyPage from "./pages/MyPage";
import VideoChatRoom from "./pages/VideoChatRoom";

const StyledApp = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  // Global States
  const state = useSelector(state => state.logInStatusReducer)
  const { user } = state

  return (
    <Router>
      <GlobalStyles />
      <StyledApp>
        <MainNav isLogedIn={user.isLogedIn}/>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <LogInPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/studyroom">
            <Lobby />
          </Route>
          <Route path='/room'>
            <VideoChatRoom/>
          </Route>
          <Route path="/studylog/todo">
            <Studylog />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
        </Switch>
      </StyledApp>
    </Router>
  );
}

export default App;
