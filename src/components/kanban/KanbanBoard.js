import React from 'react'
import styled from 'styled-components'
import BoardNav from './BoardNav'
import Kanban from './Kanban'

const KanbanWrapper = styled.div`
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

export default function KanbanBoard() {
  

  return (
    <KanbanWrapper>
      <Board>
        <BoardNav />
        <Kanban />
      </Board>
    </KanbanWrapper>
  )
}
