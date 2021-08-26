import React from 'react'
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

  const getHoveredElement = (ul, y) => {
    let closestLi = {offset: Number.NEGATIVE_INFINITY, element: null}
    
    ul.childNodes.forEach(node => {
      const box = node.getBoundingClientRect()
      const offset = y - box.top - (box.height / 2)
      
      if (offset < 0 && offset > closestLi.offset) {
        closestLi.offset = offset
        closestLi.element = node
      }
    })

    return closestLi.element
  }

  const beforeOrAfter = (element, y) => {
    let box;
    if (element.tagName !== 'LI') {
      box = getHoveredElement(element, y).getBoundingClientRect()
    } else {
      box = element.getBoundingClientRect()
    }

    const offset = y - box.top - (box.height/2)
    
    return offset < 0 ? 
    {where: 'before', id: Number(element.id)} : {where: 'after', id: Number(element.id)}
  }

  const handleDrop = (e) => {
    const itemId = Number(e.dataTransfer.getData('itemId'))
    const from = e.dataTransfer.getData('listName')
    const to = e.target.tagName === 'LI' ? e.target.parentElement.id : e.target.id
    
    const { where, id: hoveredElementId } = beforeOrAfter(e.target, e.clientY)

    const updatedList = {...items}
    const movingData = updatedList[from].filter(el => el.id === itemId)

    let newFrom = updatedList[from].filter(el => el.id !== itemId)
    let newTo;

    if (from !== to) {
      newTo = updatedList[to].reduce((acc, el) => {
        if (el.id === hoveredElementId) {
          if (where === 'before') return [...acc, ...movingData, el];
          if (where === 'after') return [...acc, el, ...movingData];
        }
        
        return [...acc, el]
      }, [])

      updatedList[from] = newFrom
      updatedList[to] = newTo

    } else {
      newFrom = updatedList[from].filter(el => el.id !== itemId)
      newTo = newFrom.reduce((acc, el) => {
        if (el.id === hoveredElementId) {
          if (where === 'before') return [...acc, ...movingData, el];
          if (where === 'after') return [...acc, el, ...movingData];
        }
        
        return [...acc, el]
      }, [])

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
