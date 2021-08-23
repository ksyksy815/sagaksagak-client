import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Item from './Item'

const StyledListWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
  padding: 1rem;
`

const StyledList = styled.ul`
  flex: 1 1 auto;
  background: var(--light-gray);
  box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.1);
  border-top: 3px solid ${props => props.borderTop};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  list-style: none;
  row-gap: 0.5rem;
  border-radius: 5px;

  h3 {
    color: #555555;
    padding: 0.5rem;
  }

  .dragging {
    background-color: #e5e5e5;
    background-image: repeating-linear-gradient(
      135deg, transparent, transparent 5px, 
      rgba(255,255,255,0.5) 5px, 
      rgba(255,255,255,0.5) 10px
    );
  }
`

export default function Kanban() {
  // Global
  const { user } = useSelector((state) => state.logInStatusReducer);
  const state = useSelector((state) => state.todoReducer);
  //const { todos } = state;
  const dispatch = useDispatch();

  const [todos, setTodos] = useState([
    {id: 1, content: "투두다"}, 
    {id: 2, content: "투두다2"},
    {id: 3, content: "투두다333"}
  ])
  const [dragData, setDragData] = useState({
    draggingId: null,
    draggingContent: null,
    hoveredEl: null,
    from: null
  })

  const handleTodoList = (newList) => {
    setTodos(newList)
  }

  const handleDragOver = (e) => {
    e.preventDefault()

    const hoveredElement = getHoveredElement (e.target, e.clientY)
    const item = document.querySelector('.dragging')

    setDragData(prev => {
      return {
        ...prev,
        hoverede: hoveredElement ? hoveredElement.id : null
      }
    })

    if (hoveredElement === null) {
      e.target.appendChild(item)
    } else {
      //ㅇ
      // e.target.insertBefore(item, hoveredElement)
    }
  }

  const getHoveredElement = (list, y) => {
    const otherElements = [...list.querySelectorAll('.draggable-items:not(.draggin)')]

    return otherElements.reduce( (closest, current) => {
      const box = current.getBoundingClientRect()
      const offset = y - box.top - (box.height / 2)

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: current }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }

  return (
    <StyledListWrapper>
      <StyledList 
        onDragOver={handleDragOver}
        borderTop={`rgb(223,117,146)`}
      >
        <h3>To-Do</h3>
        {
          todos.map((todo, index)=> (
            <Item 
              todo={todo} 
              index={index}
              todoList={todos}
              handleTodoList={handleTodoList}
              dragData={dragData}
              handleDragging={setDragData}
            />
          ))
        }
      </StyledList>
      <StyledList borderTop={`rgb(255,182,77)`}>
        <h3>In-Progress</h3>
      </StyledList>
      <StyledList borderTop={`rgb(122,212,173)`}>
        <h3>Completed</h3>
      </StyledList>
    </StyledListWrapper>
  )
}
