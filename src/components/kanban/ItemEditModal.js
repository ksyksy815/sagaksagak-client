import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'

const EditModal = styled.ul`
  position: absolute;
  z-index: 20;
  top: ${props => `${props.y + 5}px`};
  left: ${props => `${props.x}px`};
  width: 100px;
  background: var(--graish-dark-green);
  list-style: none;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.2);

  li {
    padding: 1rem;
    text-align: center;
    color: #fff;
    transition: 0.2s;
    &:hover {
      cursor: pointer;
      background: var(--mint);
    }
  }
`

export default function ItemEditModal( { position, setOpenModal } ) {
  const closeOnExitKeyPress = useCallback((e) => {
    if (e.key === "Escape") setOpenModal(false);
  },[setOpenModal]);

  const closeOnClick = useCallback((e) => {
    setOpenModal(false);
  }, [setOpenModal])

  useEffect(() => {
    window.addEventListener('keydown', closeOnExitKeyPress)
    return () => window.removeEventListener('keydown', closeOnExitKeyPress)
  }, [closeOnExitKeyPress])

  useEffect(() => {
    window.addEventListener('click', closeOnClick)
    return () => window.removeEventListener('click', closeOnClick)
  }, [closeOnClick])
  
  const {x, y} = position
  return (
    <EditModal x={x} y={y}>
      <li>수정하기</li>
      <li>삭제하기</li>
    </EditModal>
  )
}
