import React from 'react'
import styled from 'styled-components'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const AddCardButtonWrapper = styled.button`
  background: transparent;
  border: none;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  column-gap: 1rem;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
`

export default function AddCardButton( { list, openWriteForm } ) {
  const handleClick = () => {
    openWriteForm(list, 'open')
  }

  return (
    <AddCardButtonWrapper onClick={handleClick}>
      추가하기 <AiOutlinePlusCircle />
    </AddCardButtonWrapper>
  )
}
