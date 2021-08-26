import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import InnerList from './InnerList'

const StyledLists = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
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
  display: flex;
  flex-direction: column;
  background: var(--light-gray);
  box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.1);
  border-top: 3px solid ${props => props.borderTop};

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

  return (
    <StyledLists>
      <EachList borderTop={`rgb(223,117,146)`} >
        <h3>To-Do</h3>
        <InnerList items={listData} handleItemMovement={handleItemMovement} listName={`todos`}/>
      </EachList>
      <EachList borderTop={`rgb(255,182,77)`}>
        <h3>In-Progress</h3>
        <InnerList items={listData} handleItemMovement={handleItemMovement} listName={`inProgress`}/>
      </EachList>
      <EachList borderTop={`rgb(113,178,248)`}>
        <h3>Completed</h3>
        <InnerList items={listData} handleItemMovement={handleItemMovement} listName={`completed`}/>
      </EachList>
    </StyledLists>
  )
}
