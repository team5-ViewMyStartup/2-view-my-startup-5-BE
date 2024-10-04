const data = [
  {
    investorName: "김영진",
    amount: 10,
    comment: "무신사 옷만 입습니다.",
    companyId: "64c5ffd9-34a5-4052-a976-519805e62478",
  },
  {
    investorName: "이성화",
    amount: 9,
    comment: "넷플릭스 오리지날은 믿고 거릅니다.",
    companyId: "a7331539-5821-421c-a67c-57602a81fb2c",
  },
  {
    investorName: "박은미",
    amount: 8,
    comment: "다른 곳에서 찾기 어려운 물건이 많아서 좋습니다.",
    companyId: "b41ef872-80f5-4454-a890-8afe9067817e",
  },
  {
    investorName: "김승휘",
    amount: 7,
    comment: "최고의 부트캠프라고 생각합니다.",
    companyId: "6df9c67c-6f71-4e32-ba51-b5773c81e591",
  },
  {
    investorName: "현도건",
    amount: 6,
    comment: "피부트러블과 화해했습니다.!",
    companyId: "bca43550-2460-4472-90ab-5338e9486794",
  },
  {
    investorName: "최재훈",
    amount: 5,
    comment: "배민은 취준생 시절의 등불이었습니다.",
    companyId: "8e766d0e-3a5e-413f-a386-61870e719c0f",
  },
  {
    investorName: "김오이",
    amount: 5,
    comment: "당근을 하다가 제 인생의 반려자를 만났습니다.",
    companyId: "b283044e-d9b2-4e0a-8bb1-51755370d1a9",
  },
  {
    investorName: "김태우",
    amount: 4,
    comment: "치앙마이에서 산 드림캐쳐를 잃어버렸습니다.",
    companyId: "6f069c58-4ecc-423d-aa11-f69efb2c84c5",
  },
  {
    investorName: "이희라",
    amount: 4,
    comment: "클래스101에서 강의를 듣고 클래스가 높아졌습니다.",
    companyId: "6774c9f36-4742-439e-bd28-82fb78a2e83a",
  },
  {
    investorName: "김청운",
    amount: 3,
    comment: "크몽에서 일을 시작한 뒤로 하루에 두 끼를 먹게 되었습니다.",
    companyId: "aa74db0c-b1ff-41b4-8c5a-d3b0be21c40f",
  },
  {
    investorName: "안수아",
    amount: 3,
    comment: "헤이딜러에 중고차를 판매하기 위해 신차를 구매했습니다.",
    companyId: "3b2d7533-3ee7-4f2e-91e4-1764e5f2731e",
  },
  {
    investorName: "노희경",
    amount: 3,
    comment: "콰라소프트에서 만든 금융 투자 알고리즘으로 청약을 깨야했습니다.",
    companyId: "3c5d7ceb-7e38-4a2a-8d87-e4d2889769d0",
  },
  {
    investorName: "박지성",
    amount: 2,
    comment: "영어공부에 많은 도움이 됩니다.",
    companyId: "d28d7ad0-6e9e-4b82-ad25-045004ad7a0b",
  },
  {
    investorName: "윤지혜",
    amount: 2,
    comment: "최고의 전자결제 솔루션.",
    companyId: "deae7644-3daa-497f-95d7-098b732888d2",
  },
  {
    investorName: "이상훈",
    amount: 2,
    comment: "좋은 면학 분위기를 만들어주는 곳입니다.",
    companyId: "02520ccb-98b3-4384-894b-99027365791b",
  },
  {
    investorName: "박하늘",
    amount: 2,
    comment: "최고의 1인 피자를 만듭니다.",
    companyId: "21fa8b1f-8599-42e2-a6df-e92938853c85",
  },
  {
    investorName: "정민수",
    amount: 1,
    comment: "토스에 입사하게 되어 기쁘게 생각합니다.",
    companyId: "5608ff68-c85d-429a-b856-e71311a99814",
  },
  {
    investorName: "오진수",
    amount: 1,
    comment: "원활한 취업을 위해 잔디를 많이 심어야합니다.",
    companyId: "27f2cc39-689f-463b-a0b8-70a024d80815",
  },
  {
    investorName: "강재희",
    amount: 1,
    comment: "코드스테이츠의 강의가 매우 유용합니다!",
    companyId: "02520ccb-98b3-4384-894b-99027365791b",
  },
  {
    investorName: "문지혜",
    amount: 50,
    comment: "학생들에게 큰 도움이 됩니다!",
    companyId: "9ea07667-26b9-42b3-92af-7b983d1c3e1a",
  },
  {
    investorName: "한솔",
    amount: 1,
    comment: "아이들의 미래를 위해 투자합니다!",
    companyId: "757bcfaf-8b3f-42f2-8a9f-442fd5a677df",
  },
  {
    investorName: "이시우",
    amount: 1,
    comment: "코드스테이츠의 팀에 신뢰를 가지고 있습니다!",
    companyId: "02520ccb-98b3-4384-894b-99027365791b",
  },
  {
    investorName: "김도현",
    amount: 1,
    comment: "스타트업의 성장 가능성에 투자합니다!",
    companyId: "3377ab41-3553-4463-8425-c86ff1c7a911",
  },
  {
    investorName: "이태희",
    amount: 1,
    comment: "코드스테이츠의 교육 콘텐츠가 매우 훌륭합니다!",
    companyId: "02520ccb-98b3-4384-894b-99027365791b",
  },
  {
    investorName: "이주희",
    amount: 1,
    comment: "미래의 교육을 위해 투자합니다!",
    companyId: "d28d7ad0-6e9e-4b82-ad25-045004ad7a0b",
  },
];

export default data;
