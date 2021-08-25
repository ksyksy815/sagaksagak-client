import React, { useState } from 'react'
import styled from 'styled-components'
import Item from './Item'

const InnerListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  list-style: none;
  row-gap: 0.5rem;
  border-radius: 5px;
  min-height: 200
`

export default function InnerList( { items, handleItemMovement, listName }) {
  const handleDragOver = (e) => {
    e.preventDefault(e)
  }

  const handleDrop = (e) => {
    const itemId = Number(e.dataTransfer.getData('itemId'))
    const from = e.dataTransfer.getData('listName')
    const to = e.target.tagName === 'LI' ? e.target.parentElement.id : e.target.id
    
    const updatedList = {...items}
    if (from !== to) {
      // 먼저, from에서 해당하는 아이템을 찾는다
      const target = updatedList[from].filter(el => el.id === itemId)
      const newTo = [...updatedList[to], ...target]
      const newFrom = updatedList[from].filter(el => el.id !== itemId)

      updatedList[from] = newFrom
      updatedList[to] = newTo
    }

    handleItemMovement(updatedList)
  }

  return (
    <InnerListWrapper 
      id={listName}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {
        items[listName].map((item)=> (
          <Item 
            key={item.id}
            item={item} 
            id={item.id}
            todoList={items}
          />
        ))
      }
    </InnerListWrapper>
  )
}
