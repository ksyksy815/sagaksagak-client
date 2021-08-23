import { useRef } from 'react'
import styled from 'styled-components'

const StyledItem = styled.li`
  background: #fff;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
`

export default function Item( {todo, index, todoList, handleTodoList, dragData, handleDragging} ) {
  const item = useRef(null)

  const handleDragStart = () => {
    item.current.classList.add('dragging')
  }

  const handleDragEnd = () => {
    item.current.classList.remove('dragging')
  }

  return (
    <StyledItem 
      className="draggable-items"
      draggable
      ref={item}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span>{todo.content}</span>
    </StyledItem>
  )
}
