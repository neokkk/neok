---
title: 'Redux, React Hook과 사용하기'
date: '2019-11-26'
tags: ['react', 'react-hooks', 'redux']
---


리액트. 자바스크립트를 정말 사용하기 편하게 해주는 라이브러리지만, 컴포넌트 구조에 익숙하지 않다면 시작이 쉽지 않다. 효율적으로 SPA를 구현하기 위해서는 라우터와 상태 관리 라이브러리의 사용이 거의 필수적인데, [리덕스](https://redux.js.org/, '리덕스 페이지')와 [Mobx](https://mobx.js.org/README.html, 'mobx 페이지')로 대표되는 이 상태 관리 라이브러리가 리액트를 시작하는데 있어 가장 큰 진입 장벽이 아닐까 한다.

<br />

나 역시 리액트를 메인 프레임워크(라이브러리)로 정하고 나서 상태 관리에 리덕스를 적용한다는 것은 큰 부담이었다. 그래서 간단한 프로그램을 작성할 때는 일부러 사용하지 않으려고도 했는데, 이번에 리덕스를 사용 할 일이 있어서 자료를 찾다가 최신 리덕스에서 Hook을 지원한다고 해 적용해보았다. 결과는 성공적이었고 기존보다 훨씬 간단해 앞으로도 이 방식을 사용할 것 같다. 그러나 이는 아직 알파 버전이고, 계속 테스트 중이라 변경되는 부분이 있을 수 있음에 주의하자.

<br />

우선 리액트 프로그램에 리덕스를 적용하는 법부터 알아보자. 예제로 많이 사용되는 간단한 숫자 카운트 프로그램을 작성하면서 설명 할 것이다. npm으로 redux와 react-redux를 설치한다.

<br />

```bash
npm install --save redux react-redux
```

<br />

리덕스 설정은 index.js에서 한다. 

<br />

```js
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/modules';

const store = createStore(rootReducer);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

serviceWorker.unregister();

```

<br />

우선 createStore로 스토어를 생성하자. createStore는 리덕스 고유 메서드로, 인자로 리듀서를 받는다. (조금 이따 알아보자.) 스토어는 말 그대로 상태를 저장할 공간이다. 이는 리덕스 자체에서 생성되었기 때문에 우리가 작성할 리액트 프로그램에서 사용하려면 react-redux 모듈을 사용해 연결해주어야 한다. 이를 위해 Provider라는 컴포넌트를 불러와 App 컴포넌트를 감싸주자.

<br />

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/modules';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'),
);

serviceWorker.unregister();
```

<br />

App을 감싼 Provider에 store로 연결해주면 완료된다. 참고로 스토어를 생성할 때 위와 같은 리덕스 개발 도구를 적용할 수 있다. 해당 도구를 사용하면 웹 브라우저에서 스토어 내부의 상태를 쉽게 볼 수 있다.

<br />

이제 위에서 봤던 리듀서에 대해 알아보도록 하자. 리듀서를 알기 전, 리덕스의 구조에 대해 먼저 알아야 한다. 리덕스는 크게 액션, 스토어(내부의 상태), 리듀서로 구성되어있다. **액션**은 말 그대로 '행위'를 정의해놓은 것으로, 자바스크립트의 이벤트와 비슷하다고 볼 수 있다. 액션은 객체로 표현되며 type을 가지고 있어야 하고, 값을 마음대로 추가할 수 있다. **리듀서**는 스토어 내부를 변화시키는 함수이다. 스토어 내장 함수인 디스패치를 통해 액션을 리듀서로 전달한다. state와 action을 인자로 받아 현재 상태와 전달받은 액션으로 새로운 함수를 만들어 반환한다. 리듀서는 순수 함수이기 때문에 내부에 비동기와 같은 side effect가 발생할 수 없으므로 비동기 작업을 위해서는 thunk와 saga 같은 라이브러리를 사용해야한다. 

<br />

리듀서를 작성 할 차례다. 하나의 어플리케이션 당 하나의 스토어를 사용한다. 컴포넌트 내부에 바로 구현해도 되지만 store 폴더를 따로 만들도록 하자. 스토어는 1개지만 리듀서는 용도에 따라 여러개 사용이 가능하다. 보통 다른 파일로 작성한 뒤 index.js에서 combineReducers로 합쳐서 사용한다.

<br />

숫자를 늘리거나 줄이는 행위가 필요하고, 이 숫자를 보관할 count라는 상태가 필요하다. 추가적으로 숫자를 초기화하는 reset 액션도 추가해보자.

<br />

액션의 타입을 정할 때는 ducks 패턴을 사용했다. 구조를 직관적으로 파악할 수 있고, 다른 파일에서 생성하는 액션과 겹치지 않게 하기 위함이다. 액션 생성 함수에서 인자를 넘겨 이 인자값에 따라 상태를 변화시킬 수 있다. 아래 코드에서는 reset 함수를 실행할 때 인자로 'all'이라는 문자를 넘겨야만 초기화 시킨다는 제약 조건을 걸었다. 발생시키려는 액션은 다르지만 기본적으로 리듀서는 아래 구조를 가지고 있다. 

<br />

액션 생성 함수를 정의할 때 중괄호가 아닌 소괄호를 사용한다는 것과 액션 생성 함수 및 리듀서는 꼭 export해 다른 파일에서 실행할 수 있도록 해야한다는 점을 유의하자.

<br />

```js
// src/store/modules/count.js

/* 액션 타입 정의 */
const INCREMENT = 'count/INCREMENT';
const DECREMENT = 'count/DECREMENT';
const RESET = 'count/RESET';

/* 액션 생성 함수 */
export const increase = () => ({ type: INCREMENT });
export const decrease = () => ({ type: DECREMENT });
export const reset = all => ({ type: RESET, all });

/* 초기 상태값 */
const initialState = {
    count: 0
}

/* 리듀서 */
export default function count(state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      }
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1
      }
    case RESET:
      return {
        ...state,
        count: action.all === 'all' ? 0 : state.count
      }
    default:
      return state;
  }
}
```

<br />

리듀서가 여러개일 경우 관리하기 쉽게 index.js에서 모듈화 하자.

<br />

```js
// src/store/modules/index.js

import { combineReducers } from 'redux';
import count from './count';

export default combineReducers({
  count
});
```

<br />

이제 리덕스 세팅은 끝났다. 이 부분이 이해가 되지 않는다면 그냥 외우는게 낫다고 생각한다. 대부분이 비슷하게 사용되고, 여러번 코드를 작성하다 보면 저절로 흐름이 이해가 될 것이다. 문제는 이 스토어의 상태를 가져오고자 할 때 발생하는데, 기존의 방식은 mapStateToProps, mapDispachToProps와 connect로 상태와 액션 생성 함수를 props에 넣어주는 것이었다. 이 방법은 이해하기도 어렵고 클래스형 컴포넌트로 작성하기 때문에 리액트가 지향하는 바와 맞지 않는다. useSelector와 useDispatch를 이용해 간단하게 상태에 접근해보자.

<br />

"+" 버튼을 누르면 카운트 숫자가 늘어나고, "-" 버튼을 누르면 줄어들고, reset 버튼을 누르면 0으로 초기화 되는 프로그램이다. 초기값이 0인 count는 스토어에 있으므로 스토어의 상태를 조회하는 Hook인 useSelector로 불러온다. 인자로 state를 넘겨 count 리듀서 내부의 count 값을 가져오고, 스토어 액션에 의해 count 값이 변하면 자동으로 반영된다. useDispatch는 스토어 내장 함수인 dispatch를 사용할 수 있게 해주는 hook으로, 액션이 발생할 때 전달자로의 역할만 하면 된다. 다만, reset 함수의 경우 인자로 'all'이 들어올 경우에만 초기화가 되게 설정했으므로 해당 값을 넘겨주도록 하자.

<br />

```js
// src/components/Counter.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { increase, decrease, reset } from '../store/modules/count';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.count.count);

  const handleIncrease = () => dispatch(increase());
  const handleDecrease = () => dispatch(decrease());
  const handleReset = () => dispatch(reset('all'));

  return (
    <div className='Counter'>
      <h1>{count}</h1>
      <button onClick={handleIncrease}>+</button>
      <button onClick={handleDecrease}>-</button>
      <button onClick={handleReset}>reset</button>
    </div>
  );
}

export default Counter;
```

<br />

정말 간단하고 알아보기 쉽지 않은가? 기존 방식대로면 아래와 같이 복잡한 로직으로 작성해야 했을 것이다.

<br />

```js
import React from 'react';
import { connect } from 'react-redux';

import { increase, decrease, reset } from '../store/modules/count';

const Counter = ({ props }) => {
  return (
    <div className='Counter'>
      <h1>{props.count}</h1>
      <button onClick={props.handleIncrease}>+</button>
      <button onClick={props.handleDecrease}>-</button>
      <button onClick={props.handleReset}>reset</button>
    </div>
  );
}

const mapStateToProps = state => ({
  count: state.count.count,
});

const mapDispatchToProps = dispatch => ({
  handleIncrease: () => dispatch(increase()),
  handleDecrease: () => dispatch(decrease()),
  handleReset: () => dispatch(reset('all'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
```

<br />
<br />

## ○ 참고 문서

<br />

* <https://react.vlpt.us/redux/>

* <https://blog.joostory.net/564>

* <https://slee2540.tistory.com/38>
