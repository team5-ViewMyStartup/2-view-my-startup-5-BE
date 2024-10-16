## 2-view-my-startup-5-BE

> **코드잇 풀스택 2기 초급 프로젝트**
> 
> **개발기간** : 24.09.25 ~ 24.10.16
<br>

## 배포 주소
**백엔드 서버** : https://two-view-my-startup-5-be.onrender.com
<br><br>

## View My Startup
**프로젝트 개요 (공통)**

**View My Startup**는 개인 투자자들이 스타트업 정보를 검토하고 비교할 수 있도록 설계된 스타트업 기업 정보 및 모의 투자 서비스입니다. 이 프로젝트는 사용자가 투자 금액, 매출, 인원 수 등을 기준으로 스타트업 기업들의 정보를 쉽게 열람하고 비교할 수 있도록 돕습니다.
<br><br>

## 시작 가이드
**설치 및 실행 방법**
<pre>
<code>
git clone https://github.com/team5-ViewMyStartup/2-view-my-startup-5-BE.git
cd 2-view-my-startup-5-BE
npm install
npm run dev
</code>
</pre>
<br>

## 의존성 버전 명시
- **Node.js**: [v20.18.0](https://nodejs.org/en/)
- **npm**: [v10.8.2](https://www.npmjs.com/)
- **bcrypt**: [^5.1.1](https://www.npmjs.com/package/bcrypt)
- **cors**: [^2.8.5](https://www.npmjs.com/package/cors)
- **dotenv**: [^16.4.5](https://www.npmjs.com/package/dotenv)
- **express**: [^4.21.0](https://expressjs.com/)
- **jsonwebtoken**: [^9.0.2](https://www.npmjs.com/package/jsonwebtoken)
- **mongoose**: [^8.7.0](https://mongoosejs.com/)
- **nodemon**: [^3.1.7](https://nodemon.io/)

<br>

<div align=left><h1>📚 STACKS</h1></div>

**Environment**
<div align=left> 
  <img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <br><br>
</div>

**Security**
<div align=left>
  <img src="https://img.shields.io/badge/bcrypt-EFBA00?style=for-the-badge&logo=bcrypt&logoColor=white">
  <img src="https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white">
  <br><br>
</div>

**Database**
<div align=left>
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white">
  <br><br>
</div>

**Server & API**
<div align=left>
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/CORS-000000?style=for-the-badge&logo=fastly&logoColor=white">
  <br><br>
</div>

**Test**
<div align=left>
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">
  <br><br>
</div>

**Deployment**
<div align=left>
  <img src="https://img.shields.io/badge/Render-5D24A2?style=for-the-badge&logo=render&logoColor=white">
  <br><br>
</div>

**Congifuration**
<div align=left>
  <img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white">
  <img src="https://img.shields.io/badge/dotenv-1A4A7D?style=for-the-badge&logo=dotenv&logoColor=white">
  <br><br>
</div>

**Development Tools**
<div align=left>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white">
  <br><br>
</div>

**Communication & Documentation**
<div align=left>
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
  <br><br>
</div>
<br>

## API 엔드포인트

**companies.js** : 기업의 정보를 다루는 라우터입니다.
- GET /companies/: 모든 회사 목록을 조회합니다. 쿼리 파라미터로 정렬 방식을 받을 수 있습니다.
- GET /companies/:id: 특정 회사의 세부 정보를 조회합니다. 회사 ID에 해당하는 회사가 존재하지 않을 경우 404 오류를 발생시킵니다.

**compare.js** : 기업을 비교하는 기능을 제공하는 라우터입니다.
- GET /compare/select: 기본 회사와 비교할 회사를 선택하여 정보를 가져옵니다.
- GET /compare/rank: 특정 회사의 수익 및 직원 수를 기준으로 다른 회사와 비교하여 순위를 조회합니다.

**investments.js** : 투자 정보를 관리하는 라우터입니다.
- GET /investments/:companyId: 특정 회사에 대한 투자 정보를 조회합니다.
- POST /investments/: 새로운 투자 정보를 추가합니다. 로그인된 사용자만 접근할 수 있습니다.
- PATCH /investments/:id: 특정 투자 정보를 수정합니다. 사용자는 자신의 투자 정보만 수정할 수 있습니다.
- DELETE /investments/:id: 특정 투자 정보를 삭제합니다. 사용자는 자신의 투자 정보만 삭제할 수 있습니다.
  
**signup.js** : 사용자 등록 및 로그인 기능을 처리하는 라우터입니다.
- POST /users/: 새로운 사용자 등록을 처리합니다. 이메일과 닉네임 중복 체크 및 비밀번호 해시화를 수행합니다.
- POST /users/signIn: 사용자가 로그인할 수 있도록 인증을 처리합니다. 이메일과 비밀번호를 확인하여 JWT를 발급합니다.
<br>

## 디렉터리 구조
<pre>
<code>
src
├── apis
│   ├── companies.js            // 기업 관련 API 로직을 처리하는 파일
│   ├── compare.js              // 기업 비교 기능을 처리하는 API 로직을 포함하는 파일
│   ├── investments.js           // 투자 관련 API 로직을 처리하는 파일
│   └── signup.js               // 회원가입 관련 API 로직을 처리하는 파일
├── middlewares
│   └── login-checker.js        // 사용자의 로그인 상태를 확인하는 미들웨어 파일
├── models
│   ├── company.model.js        // 기업 정보를 정의하는 Mongoose 모델 파일
│   ├── company.schema.js       // 기업 데이터의 스키마 정의 파일
│   ├── investment.schema.js     // 투자 데이터의 스키마 정의 파일
│   └── user.schema.js          // 사용자 데이터의 스키마 정의 파일
├── seeds
│   └── investment
│       ├── investment-data.js   // 투자 데이터의 초기 값을 정의하는 파일
│       └── seed.js              // 데이터베이스에 초기 데이터를 시드(seed)하는 파일
└── utils
    ├── async-handler.js         // 비동기 핸들러를 정의하여 오류 처리를 간소화하는 파일
    ├── error-handler.js         // 서버 내부 오류를 처리하는 미들웨어 파일
    ├── error.js                 // 사용자 정의 오류 클래스를 정의하는 파일
    ├── jwt.js                   // JWT 관련 기능을 구현하는 파일
    └── validation.js            // 필드 내 유효성 검사(공백 검사)를 위한 함수가 포함된 파일
main.js                         // 애플리케이션의 진입점 파일
.env                            // 환경 변수를 정의하는 파일
.gitignore                      // Git이 무시할 파일 및 디렉토리를 정의하는 파일
.prettierrc                     // 코드 포맷팅을 위한 Prettier 설정 파일
package-lock.json               // 의존성의 정확한 버전 정보를 기록하는 파일
</code>
</pre>
