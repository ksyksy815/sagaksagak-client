import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import StudylogNav from '../components/StudylogNav'
import TodoList from '../components/Todos/TodoList'
import StudyRecords from '../components/StudyRecords/StudyRecords'

const StudylogWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  padding-top: 5rem;

  @media (max-width: 900px) {
    padding: 5rem 0.5rem 0.5rem 0.5rem;
    flex-direction: column;
  }
`

const Board = styled.main`
  flex: 1 1 auto;
  max-width: 1440px;
  align-self: stretch;
  background: rgba(255,255,255, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  box-shadow: 2px 2px 20px 5px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: scroll;
    
  }
`

export default function Studylog() {
  return (
    <StudylogWrapper>
      <StudylogNav />
      <Board>
        <Switch>
          <Route exact path='/studylog'>
            <TodoList />
          </Route>
          <Route path='/studylog/records'>
            <StudyRecords />
          </Route>
        </Switch>
      </Board>
    </StudylogWrapper>
  )
}
