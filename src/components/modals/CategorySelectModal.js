import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFirstLogInFalse,
  changeCategory,
  setAccessToken,
} from "../../actions/index";
import styled from "styled-components";
import axios from "axios";
import { IoIosSchool } from "react-icons/io";
import {
  FaSchool,
  FaLanguage,
  FaLaptopCode,
  FaRegBuilding,
  FaRegIdBadge,
  FaBrush,
  FaPlayCircle,
} from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { GiPoliceBadge } from "react-icons/gi";
import { device } from '../../device'

const StyledCategorySelModal = styled.div`
  ${(props) =>
    props.open
      ? `display: flex;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        align-items: center;
        justify-content: center;
        animation: modal-bg-show .3s;`
      : `display: none;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;`}
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);

  .CSModal-content-wrapper {
    width: 600px;
    height: auto;
    margin-top: 45px; //navbar 길이 만큼
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.5rem;
    padding: 30px;
    border-radius: 10px;
    background: white;
    animation: modal-show 0.3s;

    h4 {
      margin-bottom: 1rem;
      font-weight: normal;

      @media (max-width: 500px) {
        font-size: 0.9rem;
      }
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
      transition: 0.2s ease;
    }

    @media (max-width: 600px) {
      margin: 0;
      width: 95vw;
      height: 60vh;
      h1 {
        font-size: 1.5rem;
      }
    }

    @media ${device.mobile} {
      height: auto;
      margin-top: 80px;
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0px;
    }
  }

  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledGridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 0.5rem;
  column-gap: 10px;
  margin-bottom: 35px;
  width: 100%;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const StyledGridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100px;
  width: 100px;
  border-radius: 10px;
  transition: 0.2s ease;
  row-gap: 10px;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }

  .icon {
    font-size: 30px;
  }

  .select-wrapper {
    position: absolute;
    z-index: 99;
    width: 100px;
    height: 100px;
  }

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    .select-wrapper {
      width: 80px;
      height: 80px;
    }
  }

  @media ${device.mobile} {
    flex: 1 1 48%;
  }

  /* @media only screen and (max-width: 600px) {
    padding: 0 80px;
    flex-direction: row;
    justify-content: flex-start;
    width: 300px;
    height: 30px;
    column-gap: 30px;

    .icon {
      font-size: 20px;
    }

    .select-wrapper {
      width: 300px;
      height: 30px;
      transform: translateX(-80px);
    }
  } */
`;

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

const CategorySelectModal = ({ open, close }) => {
  const state = useSelector((state) => state.logInStatusReducer);
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
  const modalEl = useRef();
  const dispatch = useDispatch();

  useOnClickOutside(modalEl, () => {
    close();
    dispatch(setFirstLogInFalse());
  });

  const getTotal = (categories) => {
    const selCat = [];

    for (let category in categories) {
      if (categories[category]) selCat.push(category);
    }

    return selCat;
  };

  let total = getTotal(selected);
  let totalCnt = total.length;

  const handleSelected = (e) => {
    if (totalCnt < 3)
      setSelected({ ...selected, [e.target.id]: !selected[e.target.id] });
    if (totalCnt === 3) {
      if (selected[e.target.id])
        setSelected({ ...selected, [e.target.id]: !selected[e.target.id] });
    }
  };

  const handleSelect = (e) => {
    e.preventDefault();

    if (totalCnt < 3) return;

    axios
      .patch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/user/${state.user.userId}/category`,
        {
          newcategory: total,
        },
        {
          headers: {
            authorization: `bearer ${state.user.accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch(changeCategory(total));
        close();
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403) {
            axios
              .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/token`)
              .then((res) => {
                dispatch(setAccessToken(res.data.accessToken));

                axios
                  .patch(
                    `${process.env.REACT_APP_SERVER_DOMAIN}/user/${state.user.userId}/category`,
                    {
                      newcategory: total,
                    },
                    {
                      headers: {
                        authorization: `bearer ${state.user.accessToken}`,
                      },
                      withCredentials: true,
                    }
                  )
                  .then((res) => {
                    dispatch(changeCategory(total));
                    close();
                  })
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
              });
          }
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
    <StyledCategorySelModal open={open}>
      <div className="CSModal-content-wrapper" ref={modalEl}>
        <h1>관심사를 알려주세요</h1>
        <h4>3개를 선택해 주세요! 관심사를 통해 알맞은 방이 추천됩니다 </h4>
        <StyledGridContainer>
          <StyledGridItem
            style={{ background: selected.국내입시 ? "#D8D8D8" : "#ededed" }}
          >
            <IoIosSchool className="icon" />
            국내입시
            <div
              className="select-wrapper"
              id="국내입시"
              onClick={handleSelected}
            ></div>
          </StyledGridItem>
          <StyledGridItem
            style={{ background: selected.해외입시 ? "#D8D8D8" : "#ededed" }}
          >
            <FaSchool className="icon" />
            해외입시
            <div
              className="select-wrapper"
              id="해외입시"
              onClick={handleSelected}
            ></div>
          </StyledGridItem>
          <StyledGridItem
            style={{ background: selected.영어 ? "#D8D8D8" : "#ededed" }}
          >
            <FaLanguage className="icon" />
            영어
            <div
              className="select-wrapper"
              id="영어"
              onClick={handleSelected}
            ></div>
          </StyledGridItem>
          <StyledGridItem
            style={{ background: selected.제2외국어 ? "#D8D8D8" : "#ededed" }}
          >
            <BiWorld className="icon" />
            제2외국어
            <div
              className="select-wrapper"
              id="제2외국어"
              onClick={handleSelected}
            ></div>
          </StyledGridItem>
          <StyledGridItem
            style={{ background: selected.코딩 ? "#D8D8D8" : "#ededed" }}
          >
            <FaLaptopCode className="icon" />
            코딩
            <div
              className="select-wrapper"
              id="코딩"
              onClick={handleSelected}
            ></div>
          </StyledGridItem>
          <StyledGridItem
            style={{ background: selected.취업 ? "#D8D8D8" : "#ededed" }}
          >
            <FaRegBuilding className="icon" />
            취업
            <div
              className="select-wrapper"
              id="취업"
              onClick={handleSelected}
            ></div>
          </StyledGridItem>
          <StyledGridItem
            style={{ background: selected.자격증 ? "#D8D8D8" : "#ededed" }}
          >
            <FaRegIdBadge className="icon" />
            자격증
            <div
              className="select-wrapper"
              id="자격증"
              onClick={handleSelected}
            ></div>
          </StyledGridItem>
          <StyledGridItem
            style={{ background: selected.공무원 ? "#D8D8D8" : "#ededed" }}
          >
            <GiPoliceBadge className="icon" />
            공무원
            <div
              className="select-wrapper"
              id="공무원"
              onClick={handleSelected}
            ></div>
          </StyledGridItem>
          <StyledGridItem
            style={{ background: selected.예체능 ? "#D8D8D8" : "#ededed" }}
          >
            <FaBrush className="icon" />
            예체능
            <div
              className="select-wrapper"
              id="예체능"
              onClick={handleSelected}
            ></div>
          </StyledGridItem>
          <StyledGridItem
            style={{ background: selected.자유 ? "#D8D8D8" : "#ededed" }}
          >
            <FaPlayCircle className="icon" />
            자유
            <div
              className="select-wrapper"
              id="자유"
              onClick={handleSelected}
            ></div>
          </StyledGridItem>
        </StyledGridContainer>
        <button className={totalCnt >= 3 ? "ok" : ""} onClick={handleSelect}>
          {totalCnt >= 3 ? "선택완료" : `${3 - totalCnt}개 더 선택`}
        </button>
      </div>
    </StyledCategorySelModal>
  );
};

export default CategorySelectModal;
