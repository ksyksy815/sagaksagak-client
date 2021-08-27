import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ItemEditModal from './ItemEditModal'

const StyledItem = styled.li`
  position: relative;
  background: #fff;
  width: 100%;
  padding: 1rem 0.5rem;
  border-radius: 5px;
  transition: 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    pointer-events: none;
  }

  button {
    background: transparent;
    display: grid;
    place-content: center;
    border: none;
    svg, path {
      pointer-events: none;
    }
    &:focus {
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }
  }
`

export default function Item( {item, id, itemList} ) {
  const position = useRef({x: null, y: null})
  const [openModal, setOpenModal] = useState(false)

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('itemId', id)
    e.dataTransfer.setData('listName',e.target.parentElement.id)
  }

  const handleClickDots = (e) => {
    const box = e.target.parentElement.getBoundingClientRect()
    const x = e.clientX - box.left
    const y = e.clientY - box.top
    position.current = {x, y}
    setOpenModal(true)
  }

  return (
    <StyledItem 
      draggable
      id={id}
      onDragStart={(e) => handleDragStart(e, id)}
    >
      <span>{item.content}</span>
      <button onClick={handleClickDots}><BsThreeDotsVertical /></button>
      { openModal && <ItemEditModal position={position.current} setOpenModal={setOpenModal} /> }
    </StyledItem>
  )
}
