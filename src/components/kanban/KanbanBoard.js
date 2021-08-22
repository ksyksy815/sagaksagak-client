import React from 'react'
import styled from 'styled-components'
import BoardNav from './BoardNav'
import Kanban from './Kanban'

const KanbanWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 100vh;
  background: var(--light-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  padding-top: 4rem;
`

const Board = styled.div`
  flex: 1 1 auto;
  max-width: 1440px;
  align-self: stretch;
  background: var(--light-gray);
  display: flex;
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
