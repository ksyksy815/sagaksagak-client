import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { GlobalStyles } from "./GlobalStyles";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
// import Lobby from "./pages/Lobby"
import StudyRoomList from "./pages/StudyRoomList";
import Studylog from "./pages/Studylog";
import MyPage from "./pages/MyPage";
import VideoChatRoom from "./pages/VideoChatRoom";
import Unauthorized from "./pages/Unauthorized"
import KanbanBoard from "./components/kanban/KanbanBoard";

const StyledApp = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #c0c0c0;
`;

function App() {
  // Global States
  const state = useSelector((state) => state.logInStatusReducer);
  const { user } = state;

  return (
    <Router>
      <GlobalStyles />
      <StyledApp>
        <Header isLogedIn={user.isLogedIn} />
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
            <StudyRoomList />
          </Route>
          <Route path="/room">
            <VideoChatRoom />
          </Route>
          <Route path="/studylog">
            <Studylog />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
          <Route path="/board">
            <KanbanBoard />
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
