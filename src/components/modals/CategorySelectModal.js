import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

const StyledCategorySelModal = styled.div`
  align-self: center;
  position: absolute;
  top: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 600px;
  border: 1px solid black;
  border-radius: 10px;
  background: white;
  z-index: 999;

  h1 {
    margin-bottom: 0;
    margin-top: 0;
  }

  h4 {
    margin-top: 10px;
  }

  & > button {
    border: none;
    border-radius: 10px;
    background: #f5d0a9;
    font-size: 1rem;
    width: 90%;
    height: 2rem;

    &:hover {
      cursor: pointer;
    }
  }

  .ok {
    background: #de877f;
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 10px;
  column-gap: 10px;
  margin-bottom: 35px;
`;

const StyledGridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100px;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const CategorySelectModal = () => {
  const state = useSelector((state) => state.todoReducer);
  const [selected, setSelected] = useState({
    국내입시: false,
    해외입시: false,
    영어: false,
    제2외국어: false,
    코딩: false,
    취업: false,
    자격증: false,
    공무원: false,
    예체능: false,
    자유: false,
  });

  const handleSelected = (e) => {
    setSelected({ ...selected, [e.target.id]: !selected[e.target.id] });
  };

  const getTotal = (categories) => {
    const selCat = [];

    for (let category in selected) {
      if (selected[category]) selCat.push(category);
    }

    return selCat;
  };

  let total = getTotal(selected);
  let totalCnt = total.length;

  const handleSelect = (e) => {
    e.preventDefault();

    if (totalCnt < 3) return;

    axios
      .patch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/user/:${state.user.userId}/category`,
        {
          newcategory: total,
        },
        {
          withCredentials: true,
        }
      )
      //res에 대한 로직 구현 필요함
      .then((res) => {
        console.log(res.data.message);
      })
      //err에 대한 로직 구현 필요함
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error :", err.message);
        }
        console.log(err.config);
      });
  };

  return (
    <StyledCategorySelModal>
      <h1>관심사를 알려주세요</h1>
      <h4>관심사를 통해 알맞은 방이 추천됩니다</h4>
      <StyledGridContainer>
        <StyledGridItem
          style={{ background: selected.국내입시 ? "#D8D8D8" : "#ededed" }}
          id="국내입시"
          onClick={handleSelected}
        >
          국내입시
        </StyledGridItem>
        <StyledGridItem
          id="해외입시"
          style={{ background: selected.해외입시 ? "#D8D8D8" : "#ededed" }}
          onClick={handleSelected}
        >
          해외입시
        </StyledGridItem>
        <StyledGridItem
          id="영어"
          style={{ background: selected.영어 ? "#D8D8D8" : "#ededed" }}
          onClick={handleSelected}
        >
          영어
        </StyledGridItem>
        <StyledGridItem
          id="제2외국어"
          style={{ background: selected.제2외국어 ? "#D8D8D8" : "#ededed" }}
          onClick={handleSelected}
        >
          제2외국어
        </StyledGridItem>
        <StyledGridItem
          id="코딩"
          style={{ background: selected.코딩 ? "#D8D8D8" : "#ededed" }}
          onClick={handleSelected}
        >
          코딩
        </StyledGridItem>
        <StyledGridItem
          id="취업"
          style={{ background: selected.취업 ? "#D8D8D8" : "#ededed" }}
          onClick={handleSelected}
        >
          취업
        </StyledGridItem>
        <StyledGridItem
          id="자격증"
          style={{ background: selected.자격증 ? "#D8D8D8" : "#ededed" }}
          onClick={handleSelected}
        >
          자격증
        </StyledGridItem>
        <StyledGridItem
          id="공무원"
          style={{ background: selected.공무원 ? "#D8D8D8" : "#ededed" }}
          onClick={handleSelected}
        >
          공무원
        </StyledGridItem>
        <StyledGridItem
          id="예체능"
          style={{ background: selected.예체능 ? "#D8D8D8" : "#ededed" }}
          onClick={handleSelected}
        >
          예체능
        </StyledGridItem>
        <StyledGridItem
          id="자유"
          style={{ background: selected.자유 ? "#D8D8D8" : "#ededed" }}
          onClick={handleSelected}
        >
          자유
        </StyledGridItem>
      </StyledGridContainer>
      <button className={totalCnt >= 3 ? "ok" : ""} onClick={handleSelect}>
        {totalCnt >= 3 ? "선택완료" : `${3 - totalCnt}개 더 선택`}
      </button>
    </StyledCategorySelModal>
  );
};

export default CategorySelectModal;
