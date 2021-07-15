
// [{roomName, category, workHours, date}]
// 공부기록 페이지 맨 마지막 "참여기록" 부분에 렌더링 되는 데이터
export const dummyRecords = [
  {
    roomName: '여기가 도서관이다 생각합시당',
    category: '자유',
    workHours: 0,
    updatedAt: `2021-07-15T10:12:21.000Z`
  },
  {
    roomName: '텐서플로우 기본 개념잡기',
    category: '코딩',
    workHours: 0,
    updatedAt: `2021-07-15T10:22:08.000Z`
  },
  {
    roomName: '어떠한 공부도 환영이에요!',
    category: '자유',
    workHours: 0,
    updatedAt: `2021-07-15T11:53:19.000Z`
  },
  {
    roomName: "한쿡어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
  {
    roomName: "중국어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
  {
    roomName: "베트남어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
  {
    roomName: "포르투갈어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
  {
    roomName: "아랍어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
  {
    roomName: "일본어공부",
    category: "제2외국어",
    workHours: 3,
    date: "2021-07-12",
  },
];

// [{category, hours}]
// 공부기록 페이지 맨 위 파이차트에 들어가는 데이터
// 공부기록 페이지 맨 위 "나의 총 공부시간" 계산하는데에도 사용됨
export const dummyHoursByCategory = [
  {
    category: "국내입시",
    hours: 0,
  },
  {
    category: "해외입시",
    hours: 0,
  },
  {
    category: "영어",
    hours: 7,
  },
  {
    category: "제2외국어",
    hours: 3,
  },
  {
    category: "코딩",
    hours: 5,
  },
  {
    category: "취업",
    hours: 7,
  },
  {
    category: "자격증",
    hours: 1,
  },
  {
    category: "공무원",
    hours: 0,
  },
  {
    category: "예체능",
    hours: 0,
  },
  {
    category: "자유",
    hours: 0,
  },
];

export const recentDays = [
  {
    day: "월요일",
    hours: 2,
  },
  {
    day: "화요일",
    hours: 8,
  },
  {
    day: "수요일",
    hours: 3,
  },
  {
    day: "목요일",
    hours: 5,
  },
  {
    day: "금요일",
    hours: 1,
  },
  {
    day: "토요일",
    hours: 1,
  },
  {
    day: "일요일",
    hours: 2,
  },
];