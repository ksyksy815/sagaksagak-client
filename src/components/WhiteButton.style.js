import styled from 'styled-components'

export const Button = styled.button`
  width: 150px;
  border: 1px solid white;
  background: transparent;
  color: #fff;
  padding: 1rem;
  border-radius: 999px;
  transition: 0.2s;


  &:hover {
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 0 3px 3px rgba(255, 255, 255, 0.3);
  }
`
