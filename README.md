# 계산기 (Vanilla JS)

[**실행해보기 →**](https://full-running.github.io/calculator/)

간단하고 빠르게 동작하는 웹 계산기입니다.
숫자 버튼과 연산 버튼(+, −, ×, ÷), 소수점(.), AC(전체 지우기), DEL(한 글자 지우기), =(계산)을 제공합니다.
두 개의 디스플레이 영역을 통해 **이전 피연산자 + 연산자**와 **현재 입력값/결과**를 분리해 보여줍니다.

---

## 주요 기능

-   숫자 입력(0–9), 소수점 입력(중복 소수점 방지)
-   사칙연산(+, −, ×, ÷)
-   `=`로 계산 실행
-   `AC`로 전체 초기화, `DEL`로 마지막 글자 삭제
-   화면 상단: **이전 피연산자 + 연산자**, 하단: **현재 숫자/결과**
-   숫자 표기: `toLocaleString('en', { maximumSignificantDigits: 10 })`로 가독성 향상

---

## 기술 스택

-   **HTML/CSS/JavaScript(ES6+)** 순수 바닐라
-   외부 라이브러리 없음

---

## 프로젝트 구조

```
├─ index.html # 마크업 (버튼과 디스플레이)
├─ style.css # 레이아웃/스타일
└─ main.js # 계산 로직 및 UI 이벤트
```

-   **index.html**

    -   `.calculator-grid` 레이아웃
    -   `.previous-operand`, `.current-operand` 표시 영역
    -   `data-*` 속성(`data-number`, `data-operation`, `data-all-clear`, `data-delete`, `data-equals`)으로 버튼 식별

-   **main.js**
    -   상태: `currentNumberStr`, `previousNumberStr`, `operation`
    -   포맷팅: `getDisplayNumber()`
    -   핵심 로직: `compute()`(사칙연산), `updateDisplay()`(표시 갱신)
    -   유틸: `clear()`, `deleteDisplayNumber()`

---

## 실행 방법

아래 링크에서 바로 계산기를 사용해보실 수 있습니다.
➡ **[실행하기](https://full-running.github.io/calculator/)**

---

## 사용 방법

1. 숫자 버튼으로 값을 입력합니다.
2. 연산 버튼(+, −, ×, ÷)을 눌러 연산자를 선택합니다.
3. 다음 숫자를 입력한 뒤 `=` 버튼으로 결과를 확인합니다.
4. `AC`로 전체 초기화, `DEL`로 마지막 글자만 삭제합니다.

---

## 동작 상세

-   **소수점(`.`)** 은 현재 입력값에 한 번만 허용
-   **연속 연산 지원:** 이전 값과 연산자가 설정된 상태에서 다시 연산자를 누르면 직전 연산을 먼저 수행
-   **숫자 표기:** 최대 유효 자릿수 10자리로 표시
-   **디스플레이 구성:**
    -   현재 값 → `data-current-operand`
    -   이전 값 + 연산자 → `data-previous-operand`

---

## 브라우저 지원

-   최신 크롬, 엣지, 파이어폭스, 사파리 지원
-   ES6 문법 사용으로 매우 구형 브라우저는 미지원

---

## 배포

-   정적 파일만으로 구성되어 **GitHub Pages**에 바로 배포 가능
    1. 저장소 → `Settings > Pages`
    2. 브랜치 선택 후 저장
    3. 제공된 URL 접속

---

## 라이선스

MIT 라이선스 또는 필요 시 자유롭게 사용 가능

---

## 맺음말

버그 제보, 기능 제안, PR 환영
예: 키보드 입력 지원, 반복 계산 기능, 국제화 포맷, 테스트 코드 추가
