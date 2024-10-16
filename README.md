## 코드잇 풀스택 2기 파트2 5팀 초급 프로젝트
>**2-view-my-startup-5-BE**

**개발기간:** 24.09.25 ~ 24.10.16

[팀 협업 문서](https://rune-echinodon-d07.notion.site/2942192ef9ea4e77a2133d0be26ed56d?v=fff0f3d28b85813ba6c2000c6457ff84)

<br>

## 팀원
>**본 프로젝트는 다음 팀원들에 의해 개발되었습니다:**
- [양가현](https://github.com/gahyeon-yang)
- [이동훈](https://github.com/ciin1411)
- [현준배](https://github.com/junbaehyun)
- [박효빈](https://github.com/hyobiin9)

<br>

## View My Startup
>**프로젝트 개요**

**View My Startup**는 개인 투자자들이 스타트업 정보를 검토하고 비교할 수 있도록 설계된 스타트업 기업 정보 및 모의 투자 서비스입니다.

이 프로젝트는 개인 투자자들이 보다 쉽게 스타트업을 평가하고 투자 결정을 내릴 수 있도록 돕기 위해 설계되었습니다.
<br><br>

## 배포 주소
**백엔드 서버** : https://two-view-my-startup-5-be.onrender.com
<br><br>

## 시작 가이드
>**설치 및 실행 방법**
<pre>
<code>
git clone https://github.com/team5-ViewMyStartup/2-view-my-startup-5-BE.git  // 레포지토리를 클론합니다.
cd 2-view-my-startup-5-BE  // 프로젝트 디렉토리로 이동합니다.
npm install  // 의존성을 설치합니다.
npm run dev  // 개발 서버를 실행합니다.
</code>
</pre>

## Dependencies
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

## 기능
- **로그인 및 회원가입:** 사용자가 계정을 생성하고 로그인하여 서비스를 이용할 수 있습니다. 이메일 인증과 비밀번호 보안 강화를 위해 bcrypt 해시를 사용하여 비밀번호를 안전하게 저장합니다. 사용자는 로그인 후 JWT를 발급받아 인증된 사용자로서 다양한 서비스에 접근할 수 있습니다.
---
- **기업 리스트:** 다양한 스타트업의 목록을 제공합니다. 사용자는 각 스타트업의 기본 정보를 한눈에 볼 수 있으며, 필요에 따라 정렬 및 필터링 기능을 통해 특정 기업을 쉽게 찾을 수 있습니다.
---
- **상세 기업 조회:** 선택한 스타트업 간의 자세한 정보를 제공합니다. 사용자는 기업의 개요, 투자 현황, 매출 및 직원 수 등의 중요한 데이터를 확인할 수 있어, 투자 결정을 내리는 데 도움을 받을 수 있습니다.
---
- **기업 비교:** 여러 스타트업 간의 비교 기능을 제공합니다. 사용자는 선택한 기업들을 비교하여 각 기업의 장단점을 분석하고, 다양한 지표를 통해 투자 가능성을 평가할 수 있습니다.
---
- **모의 투자:** 사용자가 가상의 투자를 진행할 수 있습니다. 이는 실제 투자 전 스타트업의 성과를 시뮬레이션하고, 투자 전략을 세우는 데 유용합니다. 사용자는 가상 투자 금액과 기업을 선택하여 투자 결과를 확인할 수 있습니다.
---
- **투자 관리:** 사용자가 자신의 투자 내역을 관리하고 수정할 수 있는 기능을 제공합니다. 사용자는 자신의 투자 이력을 조회하고, 필요한 경우 투자 정보를 수정하거나 삭제하여, 보다 효과적으로 투자 포트폴리오를 관리할 수 있습니다.
---
<br>

## ERD
![ERD-Image](https://raw.githubusercontent.com/team5-ViewMyStartup/2-view-my-startup-5-BE/5b8b82683afca930337a53cdbc1cfd5ba81efd1c/2-view-my-startup-6-BE.v.0.0.7.drawio.png)
<br>

## API 엔드포인트
**companies.js:** 회사의 정보를 다루는 라우터입니다.

- **GET /companies**: 모든 회사의 목록을 조회합니다. 쿼리 파라미터로 정렬 방식을 받을 수 있으며, 기본 정렬 방식은 최근 등록된 순서입니다.

- **GET /companies/:id**: 특정 회사의 세부 정보를 조회합니다. 요청한 회사 ID에 해당하는 회사가 존재하지 않을 경우, 404 오류를 발생시킵니다. 응답은 회사의 상세 정보와 관련된 추가 데이터를 포함할 수 있습니다.

---

**compare.js:** 회사를 비교하는 기능을 제공하는 라우터입니다.

- **GET /compare/select**: 사용자가 선택한 회사와 비교할 다른 회사를 선택하여 정보를 가져옵니다. 비교할 회사는 쿼리 파라미터로 전달할 수 있으며, 최대 선택 가능한 회사 수에 제한이 있을 수 있습니다.

- **GET /compare/rank**: 특정 회사의 수익 및 직원 수를 기준으로 다른 회사와 비교하여 순위를 조회합니다. 비교 기준은 쿼리 파라미터로 지정할 수 있으며, 결과는 해당 기준에 따른 순위 목록으로 반환됩니다.

---

**investments.js:** 투자 정보를 관리하는 라우터입니다.

- **GET /investments/:companyId**: 특정 회사에 대한 투자 정보를 조회합니다. 해당 회사에 대한 투자 내역이 없을 경우, 빈 배열을 반환합니다.

- **POST /investments**: 새로운 투자 정보를 추가합니다. 로그인된 사용자만 접근할 수 있으며, 투자 금액 및 관련 정보를 포함해야 합니다.

- **PATCH /investments/:id**: 특정 투자 정보를 수정합니다. 사용자는 자신의 투자 정보만 수정할 수 있으며, 수정할 정보는 요청 본문에 포함되어야 합니다.

- **DELETE /investments/:id**: 특정 투자 정보를 삭제합니다. 사용자는 자신의 투자 정보만 삭제할 수 있으며, 삭제 요청 시 해당 정보의 ID를 포함해야 합니다.

---

**signup.js:** 사용자 등록 및 로그인 기능을 처리하는 라우터입니다.

- **POST /users**: 새로운 사용자 등록을 처리합니다. 이메일과 닉네임 중복 체크 및 비밀번호 해시화를 수행하며, 성공 시 사용자 정보를 반환합니다.

- **POST /users/signIn**: 사용자가 로그인할 수 있도록 인증을 처리합니다. 이메일과 비밀번호를 확인하여 JWT를 발급하며, 유효한 토큰이 발급되면 사용자 정보를 반환합니다.
---
<br>

## API 명세서
[포스트맨 링크](https://documenter.getpostman.com/view/24530900/2sAXxTbW4Y)
<br><br>

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
<br>
