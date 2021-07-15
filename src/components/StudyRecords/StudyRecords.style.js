import styled from "styled-components";
import { device } from "../../device";

export const RecordsWrapper = styled.div`
  box-sizing: border-box;
  max-width: 1000px;
  flex: 1 1 auto;
  width: 100%;
  min-height: 100%;
  padding: 1rem;
  background-color: #e9e4de;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .no-records {
    padding: 2rem;
  }

  .records-top {
    width: 100%;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;

    h1 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-self: flex-start;
      padding: 1rem;
      padding-bottom: 0.5rem;
      column-gap: 1rem;
    }

    .pie-box {
      width: 400px;
      height: 450px;
      display: flex;
      justify-content: center;
      align-items: center;

      @media ${device.tablet} {
        width: 500px;
      }
      @media ${device.mobile} {
        width: 300px;
      }
    }
  }

  .records-mid {
    width: 100%;
    height: 100vh;
    display: flex;
    min-height: 70vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    row-gap: 2rem;

    h2 {
      align-self: flex-start;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 1rem;
      padding: 1rem;
      padding-bottom: 0.5rem;
    }
  }

  .records-bottom {
    width: 100%;
    height: auto;
    min-height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5rem;
    row-gap: 2rem;

    h2 {
      align-self: flex-start;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 1rem;
      padding: 1rem;
      padding-bottom: 0.5rem;
    }

    ul {
      list-style: none;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

export const Record = styled.li`
  flex: 1 1 30%;
  padding: 1.5rem;
  background-color: #ebebeb;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  row-gap: 0.5rem;
  transition: 0.2s;

  &:hover {
    background-color: #fff;
    transform: translateY(-2px);
  }

  .record-category {
    padding: 0.3rem 0.5rem;
    background-color: #eccc81;
    border-radius: 10px;
  }
  .record-roomName {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .record-info {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 0.9rem;
    column-gap: 1rem;
    padding-left: 0.3rem;
  }

  @media (max-width: 1000px) {
    flex: 1 1 47%;
    min-width: 300px;
  }
  @media ${device.mobile} {
    padding: 0.8rem;
    .record-category {
      font-size: 0.9rem;
    }
    .record-roomName {
      font-size: 1.2rem;
    }
    .record-info {
      padding: 0;
    }
  }
`;

export const MemberOnlyContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;