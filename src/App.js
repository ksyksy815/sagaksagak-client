import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { GlobalStyles } from "./GlobalStyles";
import MainNav from "./components/MainNav";
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
// import Lobby from "./pages/Lobby"
import StudyRoomList from "./pages/StudyRoomList";
import Studylog from "./pages/Studylog";
import MyPage from "./pages/MyPage";
import VideoChatRoom from "./pages/VideoChatRoom";
import Unauthorized from "./pages/Unauthorized"

const StyledApp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  // Global States
  const state = useSelector((state) => state.logInStatusReducer);
  const { user } = state;

  return (
    <Router>
      <GlobalStyles />
      <StyledApp>
        <Switch>
          <Route exact path="/">
            <MainNav isLogedIn={user.isLogedIn} />
            <LandingPage />
          </Route>
          <Route path="/login">
            <MainNav isLogedIn={user.isLogedIn} />
            <LogInPage />
          </Route>
          <Route path="/signup">
            <MainNav isLogedIn={user.isLogedIn} />
            <SignUpPage />
          </Route>
          <Route path="/studyroom">
            <MainNav isLogedIn={user.isLogedIn} />
            <StudyRoomList />
          </Route>
          <Route path="/room">
            <VideoChatRoom />
          </Route>
          <Route path="/studylog">
            <MainNav isLogedIn={user.isLogedIn} />
            <Studylog />
          </Route>
          <Route path="/mypage">
            <MainNav isLogedIn={user.isLogedIn} />
            <MyPage />
          </Route>
          <Route path="/unauthorized">
            <Unauthorized />
          </Route>
        </Switch>
      </StyledApp>
    </Router>
  );
}

export default App;
