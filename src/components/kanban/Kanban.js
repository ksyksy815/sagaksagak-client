import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import AddCardButton from './AddCardButton'
import InnerList from './InnerList'
import KanbanForm from './KanbanForm'

const StyledLists = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  column-gap: 1rem;
  padding: 1rem;

  @media (max-width: 900px) {
    flex-direction: column;
    row-gap: 1rem;
    padding: 0.5rem;
  }
`

const EachList = styled.div`
  flex: 1 1 33.333%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  background: var(--light-gray);
  border-top: 3px solid ${props => props.borderTop};
  row-gap: 0.5rem;

  h3 {
    color: #555555;
    padding: 0.5rem;
    text-align: center;
  }
`

export default function Kanban() {
  // Global
  const { user } = useSelector((state) => state.logInStatusReducer);
  const state = useSelector((state) => state.todoReducer);
  //const { todos } = state;
  const dispatch = useDispatch();

  // Local
  const [listMode, setListMode] = useState({
    todo: 'read',
    inProgress: 'read',
    completed: 'read'
  })

  const [listData, setListData] = useState({
    todos: [
      {id: 11, content: "투두랍니다"}, 
      {id: 12, content: "저도 투두랍니다"},
      {id: 13, content: "저도 투두요"}
    ],
    inProgress: [
      {id: 21, content: "진행중에 있던 아이입니다"}, 
      {id: 22, content: "진행 중에 있던 아이입니다 222"},
      {id: 23, content: "저도 진행 중에...333"}
    ],
    completed: [
      {id: 31, content: "완료된 태스크입니다"}, 
      {id: 32, content: "완료된 태스크입니다222"},
      {id: 33, content: "완료된 태스크입니다333"}
    ]
  })

  const handleItemMovement = (updatedList) => {
    setListData(updatedList)
  }

  const toggleForm = useCallback ((listName, action) => {
    switch (listName) {
      case 'todo':
        action === 'open' ?
        setListMode({...listMode, todo: 'create'}) :
        setListMode({...listMode, todo: 'read'})
        break;
      case 'inProgress':
        action === 'open' ?
        setListMode({...listMode, inProgress: 'create'}) :
        setListMode({...listMode, inProgress: 'read'})
        break;
      case 'completed':
        action === 'open' ?
        setListMode({...listMode, completed: 'create'}) :
        setListMode({...listMode, completed: 'read'})
        break;
      default: return
    }
  }, [listMode])

  const handleCreation = (listName, content) => {
    // ID 넘버는 서버 통신 추가 시 서버에서 받아 와야함
    switch (listName) {
      case 'todo':
        const newTodo = [...listData.todos, {id: 500, content}]
        setListData({...listData, todos: newTodo})
        break;
      case 'inProgress':
        const newInProgress = [...listData.inProgress, {id: 500, content}]
        setListData({...listData, inProgress: newInProgress})
        break;
      case 'completed':
        const newCompleted = [...listData.completed, {id: 500, content}]
        setListData({...listData, completed: newCompleted})
        break;
      default: return
    }
  }

  return (
    <StyledLists>
      <EachList borderTop={`rgb(223,117,146)`} >
        <h3>To-Do</h3>
        <InnerList items={listData} handleItemMovement={handleItemMovement} listName={`todos`}/>
        { listMode.todo === 'create' ? 
          <KanbanForm list={'todo'} closeForm={toggleForm} addItem={handleCreation}/> : 
          <AddCardButton list={'todo'} openWriteForm={toggleForm}  />
        }
      </EachList>
      <EachList borderTop={`rgb(255,182,77)`}>
        <h3>In-Progress</h3>
        <InnerList items={listData} handleItemMovement={handleItemMovement} listName={`inProgress`}/>
        { listMode.inProgress === 'create' ?
          <KanbanForm list={'inProgress'} closeForm={toggleForm} addItem={handleCreation}/> :
          <AddCardButton list={'inProgress'} openWriteForm={toggleForm} />
        }
      </EachList>
      <EachList borderTop={`rgb(113,178,248)`}>
        <h3>Completed</h3>
        <InnerList items={listData} handleItemMovement={handleItemMovement} listName={`completed`}/>
        { listMode.completed === 'create' ? 
          <KanbanForm list={'completed'} closeForm={toggleForm} addItem={handleCreation} /> : 
          <AddCardButton list={'completed'} openWriteForm={toggleForm} />
        }
      </EachList>
    </StyledLists>
  )
}
