import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FiChevronsUp } from "react-icons/fi";

const TopButton = styled.button`
  position: fixed;
  right: 1rem;
  bottom: 5%;
  width: 50px;
  align-self: flex-end;
  background: transparent;
  border: none;
  font-size: 3rem;
  z-index: 300;
  transition: 0.2s;
  display: ${(props) => (props.visible ? `flex` : `none`)};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }

  span {
    font-size: 1rem;
    color: #f58820;
  }

  svg {
    polyline {
      color: #f58820;
    }
  }
`;
export default function GoToTopButton() {
  const [visible, setVisible] = useState();

  const toggleVisibleRef = useRef();

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 600) {
      setVisible(true);
      return;
    }
    setVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => (toggleVisibleRef.current = toggleVisible));

  useEffect(() => {
    const toggle = () => {
      toggleVisibleRef.current();
    };

    window.addEventListener("scroll", toggle);

    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <TopButton onClick={scrollToTop} visible={visible}>
      <FiChevronsUp />
      <span>TOP</span>
    </TopButton>
  );
}
