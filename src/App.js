
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import styled from 'styled-components'
import { GlobalStyles } from './GlobalStyles'
import MainNav from './components/MainNav';
import LandingPage from './pages/LandingPage';

const StyledApp = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Router>
      <GlobalStyles/>
      <StyledApp>
        <MainNav />
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
        </Switch>
      </StyledApp>
    </Router>
  );
}

export default App;
