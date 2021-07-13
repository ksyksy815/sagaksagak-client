import React from 'react'
import styled from 'styled-components'
import { FiChevronsUp } from 'react-icons/fi'

const TopButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 10%;
  width: 50px;
  align-self: flex-end;
  background: transparent;
  border: none;
  font-size: 3rem;
  z-index: 300;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }

  span{
    font-size: 1rem;
  }
`
export default function GoToTopButton() {
  return (
    <TopButton>
      <FiChevronsUp />
      <span>TOP</span>
    </TopButton>
  )
}
