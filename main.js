// ===== DOM 참조 =====
const btnNumbers = document.querySelectorAll('[data-number]');
const btnOperations = document.querySelectorAll('[data-operation]');
const btnAllClear = document.querySelector('[data-all-clear]');
const btnDelete = document.querySelector('[data-delete]');
const btnEqual = document.querySelector('[data-equals]');

const displayPrevious = document.querySelector('[data-previous-operand]');
const displayCurrent = document.querySelector('[data-current-operand]');

// ===== 상태(state) =====
let current = ''; // 현재 입력 중인 숫자(문자열)
let previous = ''; // 이전 숫자(문자열)
let operation = null; // '+', '-', '×', '÷' 중 하나 또는 null

// ===== 공통: 화면 갱신 =====
function updateDisplay() {
  displayCurrent.textContent = current || '0';
  displayPrevious.textContent = operation ? `${previous} ${operation}` : '';
}

// ===== 숫자 입력 =====
function onNumberClick(digit) {
  if (digit === '.') {
    if (current.includes('.')) return; // 소수점 중복 방지
    if (current === '') current = '0'; // 처음 '.' → '0.' 보정
  }
  current += digit;
  updateDisplay();
}

// ===== 연산 선택 =====
function onOperationClick(op) {
  if (current === '') return; // 숫자 없이 연산 금지

  // 이전 값이 있고, 현재 값도 있으면 먼저 계산(연속 연산)
  if (previous !== '' && operation && current !== '') {
    compute();
  }

  // 연산 세팅
  previous = current;
  operation = op;
  current = '';
  updateDisplay();
}

// ===== 계산 실행 =====
function compute() {
  const a = parseFloat(previous);
  const b = parseFloat(current);
  if (isNaN(a) || isNaN(b)) return;

  // 0으로 나누기 방지
  if (operation === '÷' && b === 0) {
    clearAll();
    displayCurrent.textContent = 'Error';
    return;
  }

  let result;
  switch (operation) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '×':
      result = a * b;
      break;
    case '÷':
      result = a / b;
      break;
    default:
      return;
  }

  // 결과를 current로, 나머지는 초기화
  current = String(result);
  previous = '';
  operation = null;
}

// ===== 제어(=, AC, DEL) =====
function onEqual() {
  if (previous === '' || current === '' || !operation) return;
  compute();
  updateDisplay();
}

function clearAll() {
  current = '';
  previous = '';
  operation = null;
  updateDisplay();
}

function deleteOne() {
  if (current === '') return;
  current = current.slice(0, -1);
  updateDisplay();
}

// ===== 이벤트 바인딩 =====
btnNumbers.forEach(btn => {
  btn.addEventListener('click', () => onNumberClick(btn.textContent));
});

btnOperations.forEach(btn => {
  btn.addEventListener('click', () => onOperationClick(btn.textContent));
});

btnEqual.addEventListener('click', onEqual);
btnAllClear.addEventListener('click', clearAll);
btnDelete.addEventListener('click', deleteOne);

// 초기 표시
updateDisplay();

/* ===== (선택) 키보드 입력 지원 — 필요 시 주석 해제 =====
document.addEventListener('keydown', (e) => {
  const k = e.key;

  // 숫자 & 소수점
  if ((k >= '0' && k <= '9') || k === '.') {
    onNumberClick(k);
    return;
  }

  // 연산자
  if (k === '+' || k === '-' || k === '*' || k === '/') {
    const op = k === '*' ? '×' : (k === '/' ? '÷' : k);
    onOperationClick(op);
    return;
  }

  // 제어
  if (k === 'Enter' || k === '=') onEqual();
  if (k === 'Backspace') deleteOne();
  if (k.toLowerCase() === 'c' || k === 'Escape') clearAll();
});
*/
