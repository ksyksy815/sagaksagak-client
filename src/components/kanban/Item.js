import React from 'react'
import styled from 'styled-components'

const StyledItem = styled.li`
  background: #fff;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  span {
    pointer-events: none;
  }
`

export default function Item( {item, id, itemList} ) {
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('itemId', id)
    e.dataTransfer.setData('listName',e.target.parentElement.id)
  }

  return (
    <StyledItem 
      draggable
      id={id}
      onDragStart={(e) => handleDragStart(e, id)}
    >
      <span>{item.content}</span>
    </StyledItem>
  )
}
