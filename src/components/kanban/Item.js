import { useRef } from 'react'
import styled from 'styled-components'

const StyledItem = styled.li`
  background: #fff;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
`

export default function Item( {todo, index, todoList, handleTodoList} ) {
  const draggingItem = useRef()
  const dragOverItem = useRef()

  const handleDragStart = (e, position) => {
    draggingItem.current = position
    console.log(e.target)
  }

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position
    console.log(e.target)
  }

  const handleDragEnd = (e) => {
    console.log(`드래그 앤드다. 되니?`)
    const listCopy = [...todoList]
    
    const draggingItemContent = listCopy[draggingItem.current]
    listCopy.splice(draggingItem.current, 1)
    listCopy.splice(dragOverItem.current, 0, draggingItemContent)

    //초기화
    draggingItem.current = null
    dragOverItem.current = null
    handleTodoList(listCopy)
    console.log(listCopy)
  }

  return (
    <StyledItem 
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragEnter={(e) => handleDragEnter(e, index)}
      onDragEnd = {handleDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <span>{todo.content}</span>
    </StyledItem>
  )
}
