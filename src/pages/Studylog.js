import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import StudylogNav from '../components/StudylogNav'
import TodoList from '../components/TodoList'
import StudyRecords from '../components/StudyRecords'

const StudylogWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(250px, 25%) 1fr;
  position: absolute;
  top: 75px;
  left: 5%;
  right: 5%;
  bottom: 5%;
  border-radius: 15px;
  overflow: hidden;
`

export default function Studylog() {
  return (
    <StudylogWrapper>
      <StudylogNav />
      <Switch>
        <Route path='/studylog/todo'>
          <TodoList />
        </Route>
        <Route path='/studylog/records'>
          <StudyRecords />
        </Route>
      </Switch>
      
    </StudylogWrapper>
  )
}
