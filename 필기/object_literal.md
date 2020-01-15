# 객체 리터럴(Object literal)
- 자바스크립트에서 객체는 인스턴스와 자료구조(key, value)라는 2가지 역할을 다 할 수 있다.
- 객체 리터럴은 key, value 형태의 자료구조로써의 역할을 주력한다.
- ES6에 와서 객체 리터럴에 많은 기능 추가/개선이 이뤄져서 다양하게 응용이 가능해졌다.

## 비구조화 할당(Destructuring Assignment)
- 객체를 받는 변수를 {}로 감싸면 해당 키값을 변수로 사용할 수 있다.
- 객체의 이름으로 변수를 만들고 <U>값을 '복사'해서  대입</U>한 것이다.
- **=** 초기값을 대입(값이 없을때 대입되는 기본값)
- **:** 뒤에 있는 이름으로 변수명 변경
- 생략하면 그대로 변수명으로 할당

```javascript
let state = {user:{}};
state.user = {
  loading: false,
  data: [1,2,3],
  error: new Error('err'),
}

const { loading=true, data: user, error } = state.user;
console.log({loading, user, error});
/*
  {
    loading: false, loading에 대입한 true는 초기값이기때문에 반환된 false가 대입
    user: Array(3), 키가 data가 아닌 user로 변경됬됬음
    error: Error객체, error가 변수명 그대로 쓰임
  }
*/
```

### 값을 '복사'해서  대입
- 구조 분해한 변수에 다른 값을 대입하면 대입하면 변수의 값만 바뀔뿐 원본 객체의 값은 변하지 않는다.

```javascript
const { loading=true, data: user, error } = state.user;

loading="로딩중";
user=[];
error=null;

console.log({loading, user, error}); // {loading: "로딩중", user: Array(0), error: null}
console.log(state.user);             // {loading: false, data: Array(3), error: Error: err}
```

## 객체 리터럴 개선(Object Literal Enhancement)
- 변수로 선언한 리터럴 값들을 객체로 바인딩 할 수도 있다.
- 비구조화 할당 문법을 반대로 사용하면 된다.
- 함수 리터럴에서 this를 호출해보면 객체로 바인딩 되었다는 사실을 확인 할 수 있다.

```javascript
let name = '연우';
let print = function (_name) { // arrow function을 사용할 경우 this는 무조건 전역 객체
  _name ? console.log(`My name is ${_name}`) : console.log(`My name is ${this.name}`);
}

let staticClass = {name, print};

staticClass.print();         // My name is 연우
staticClass.print('아이린'); // My name is 아이린
```

## 동적 속성 키(Dynamic Property Keys)
- 객체의 키를 동적으로 할당이 가능하다.
- 즉 객체 리터럴 내부에서도 프로퍼티 키를 동적으로 생성이 가능해졌다.
- 계산된 프로퍼티 이름(Computed property name)라고 함

```javascript
const key = 'key';
let i = 0;

const obj = {
  [`${key}${++i}`]: i,
  [`${key}${++i}`]: i,
  [`${key}${++i}`]: i,
};
console.log(obj); // {key1: 1, key2: 2, key3: 3}
```

## 메소드 축약 표현
- 객체리터럴 속에 메서드를 선언할때, class의 method 선언할때처럼 function 키워드 생략이 가능하다

```javascript
const obj = {
  name: "ES6"
  say() {
    console.log(`Hello ${this.name}`);
  }
}
```