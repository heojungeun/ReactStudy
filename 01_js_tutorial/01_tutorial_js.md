---
marp: true
theme: uncover
class: invert
paginate: true
size: 16:9
---

# 2024.04.18

---

# 리액트 랑 친해지는 날
야호!

---

## 왜 친해져야하는데..

#### 현재 웹 개발 언어에서 커뮤니티가 가장 큼
-> 참고할 수 있는 자료, 오픈소스가 넘친다!
-> 리액트를 사용하는 기업이 많다!

---

### ✨✨✨✨✨✨✨✨✨
# ✨ 자바스크립트 ✨
### ✨✨✨✨✨✨✨✨✨
<!-- ios 는 swift, android는 자바, 코틀린을 알아야 하듯이! 리액트는 js를 알아야함-->

---

# 목차
1. 동등 비교
2. 함수
3. 클래스
4. 클로저
5. 이벤트 루프와 비동기 통신의 이해
6. 문법
7. 타입스크립트

---

### 동등 비교하기 전, 데이터 타입
- **undefined**
- **null**
- **boolean**
- **number**
- bigint
- **string**
- symbol
- *object*

<!-- undefined는 값을 아직 할당하지 않음, null은 비어 있는 값 -->
<!-- 여기선 int가 아니고 number로 표현 -->
<!-- 문자열, 참거짓 타입은 자주 쓰니까 진하게! -->
<!-- 문자열은 원시 타입이기 때문에, 문자열 사이의 글자 하나를 변경하는 것 불가 -->

<!-- 원시타입 제외 모든 것은 다 객체 - 배열, 함수, 정규식, 클래스 다~ -->
<!-- 객체 타입은 참조 타입 -->

---

### 원시 타입 동등 비교

#### 📦(값A) === 📦(값A) ⭕️ true
#### 📦(값A) === 📦(값B) ❌ false

---

### 객체 타입 동등 비교

#### 📦(값A) === 📦(값A) ❌ false
서로 다른 참조를 바라보기 때문!

-> **객체 내부 값은 같더라도 객체 자체 비교는 true가 아닐 수 있다**

---

## 리액트는 동등비교 어떻게 하지?

Object.is + shallow equal

---
### object.is
- 둘 다 undefined
- 둘 다 null
- 둘 다 true 또는 둘 다 false
- 둘 다 같은 문자에 같은 길이인 문자열
- 둘 다 같은 객체
- 둘 다 숫자이며,
    - 둘 다 +0
    둘 다 -0
    둘 다 NaN
    둘 다 0이나 NaN이 아니고 같은 값을 지님

---

### shallow equal

객체의 첫번째 깊이까지 비교

<!-- 리액트는 props에서 꺼내온 값을 기준으로 렌더링을 수행하기 때문에 기본 동등 비교함수에선 첫번째 깊이까지 비교하는 걸로 충분 -->

---

#### 함수 (컴포넌트)

<!-- “props”라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환 -->
<!-- 엘리먼트는 React 앱의 가장 작은 단위입니다. 엘리먼트는 화면에 표시할 내용을 기술합니다. const ele = <div>hi!</div> -->

```javascript
function sum(a, b) {
    return a+b;
}

sum(2, 4)
```

```javascript
function Component(props) {
    return <div>I want to {props.leaveWork}</div>;
}

<Component {...props} />
```

---

### 함수 선언문 vs 함수 표현식
처음부터 호이스팅 가능 vs 할당 전(undefined), 후 작동
```javascript
function aaa() {} // 선언
var aaa = function () {} // 표현
```
<!-- 함수의 호이스팅이란 함수 선언을 실행 전에 미리 메모리에 등록하는 작업 -->

---

## 화살표 함수

```javascript
const aaa = () => {}
```
- 생성자, argument 사용 불가
- this 바인딩 = 상위 스코프의 this

---

## 클래스
패쓰

---

### Scope 스코프

##### 전역 스코프: 전역에 선언됨
##### 함수 레벨 스코프: {}로 구분짓지 않고, 함수 안/밖이냐로 구분

---

## 클로저
함수와 함수가 선언된 어휘적 환경(lexical scope)의 조합

-> **자신이 선언된** 당시의 환경을 기억하는 함수
-> 생명 주기가 끝난 외부 함수의 변수에 접근할 수 있는 내부 함수

---

-> 자신이 선언된 당시의 환경을 기억하는 함수
-> 생명 주기가 끝난 외부 함수의 변수에 접근할 수 있는 내부 함수

```javascript
function outerFunc() {
  // 외부 함수의 변수
  var x = 10;

  // 내부 함수에서 외부 함수의 변수에 접근할 수 있습니다.
  var innerFunc = function () {
    console.log(x);
  };

  return innerFunc;
}

var inner = outerFunc(); // 외부함수는 innerFunc을 반환 후 생명주기가 끝남
inner(); // 외부함수의 생명주기가 끝났지만 외부함수의 변수에 접근 할 수 있다.
```
---

### 이거 왜 써요..?

1. 전역 스코프의 사용을 막을 수 있다.
2. 개발자가 원하는 정보만 원하는 방향으로 노출시킬 수 있다.
3. 현재 상태를 기억하고 변경된 최신 상태를 유지

-> react `useState()`가 바로 closure 사용 예시!

---
### 이벤트 루프와 비동기 통신의 이해
👤: 일단 javascript는 대충 만들었던 언어입니다
-> 싱글 스레드라는 뜻
-> 코드 실행이 한 스레드에서 순차적으로 이뤄진다
-> 코드를 한 줄, 한 줄 정성스레..실행한다
-> 동기식
 
---

### 단어를 먼저 알아두자
- **호출 스택(call stack)**: 
    수행해야할 코드나 함수를 순차적으로 담아둔 stack
- **이벤트 루프**:
    호출 스택이 비어 있는지 체크체크 하는 기능
- **테스크 큐(task queue)**: 실행해야 할 테스크(비동기 콜백 함수, 이벤트 핸들러)의 집합

<!-- 코드 실행, 이벤트 루프 모두 단일 스레드에서 일어난다 -->

---

### 동기/비동기 작업

1. 동기: 단일 스레드(코드 실행 / 호출 스택 비어있는지 확인)
2. 비동기: 메인 스레드(코드 실행 / 호출 스택 비어있는지 확인)
        외부 스레드(테스크 큐 실행 / 테스크 큐 확인 / ...)

---

### 정리

자바스크립트가 ‘단일 스레드’ 기반 => 자바스크립트 엔진이 단일 Call Stack을 사용한다

실제 자바스크립트가 실행되는 환경(브라우저, Node.js)에서는 주로 멀티 스레드를 사용한다.

이런 구동 환경이 단일 스레드 자바스크립트 엔진과 상호 연동하기 위해 사용하는 장치가 **이벤트 루프**인 것이다. 

즉, 브라우저, Node.js환경은 자바스크립트 엔진의 Wrapper 역할을 하고 있다.

---

![alt text](https://pozafly.github.io/static/8777e58593e15d2b8520249052ba6463/f2ede/1.png)

---

### 마이크로 테스크 큐
대표적으로 Promise 가 있다.

- 테스크 큐보다 먼저 실행됨
- 각 마이크로 테스크 큐가 끝날 때마다 렌더링이 일어난다.

---

### 문법

##### 1. 구조 분해 할당
```javascript
const [count, setCount] = useState();

const array = [1, 2, 3, 4];
cosnt [aaa, bbb, ...rest] = array;
// aaa 1
// bbb 2
// rest [3, 4]
```

---

##### 2. 전개 구문

```javascript
const array = [1, 2, 3, 4];
cosnt arr2 = [...array, 5, 6]; // 값만 복사, 참조는 다름
// array [1, 2, 3, 4]
// arr2 [1, 2, 3, 4, 5, 6]
```
*객체도 방법 같음. 다만 전개 구문과 값 할당 순서가 중요함
뒤 순서 값이 최종 값이라고 생각하면 편함

---

##### 3. Array 메서드
```javascript
const array = [1, 2, 3, 4, 5];
const mapArr = array.map((item) => item * 2);
const map2Arr = array.map((item) => {
    return <div>{item}</div> // 데이터가 배열일 때, 각 데이터마다 리액트 요소 퉤
});
const filterArr = array.filter((item) => item % 2 === 0);
const reduceArr = array.reduce((result, item) => {return result + item}, 0);
// 0은 result 의 초기값

array.forEach((item) => {
    if (item === 3)
        return;
    console.log(item);
}) // 3빼고 다 나옴
```

---

##### 4. 삼항 연산자
jsx, tsx 내부에서 조건부로 렌더링할 때 많이 써요!
```javascript
const [loading, setLoading] = useState(false);
const result = loading ? <div>잠시만 기다려</div> : <div>퇴근!</div>
```

---

### 타입 스크립트
엄격하고 좀 더 안정적인 js!

---
## 참고
[동등 비교](https://velog.io/@dahyeon405/React%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B0%92%EC%9D%84-%EB%B9%84%EA%B5%90%ED%95%A0%EA%B9%8C)
[함수 컴포넌트](https://ko.legacy.reactjs.org/docs/components-and-props.html)
[클로져](https://enjoydev.life/blog/javascript/6-closure)
[이벤트 루프와 비동기 작업](https://pozafly.github.io/javascript/event-loop-and-async/)