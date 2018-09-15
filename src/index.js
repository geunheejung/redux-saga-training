import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas/mainSaga';

import App from './App';

const sagaMiddleware = createSagaMiddleware({
  // emitter 프로퍼티는 redux --> (...미들웨어...) --> reduxSaga Action을 넘길때 사용된다.

  // emitter: emit => action => {
  //   /* emitter은 고차 함수이며 emit 함수의 내부는 되어있다.
  //     ƒ emit(item) {
  //       var arr = subscribers.slice();
  //       for (var i = 0, len = arr.length; i < len; i++) {
  //         arr[i](item);
  //       }
  //     }
  //    */
  //   console.log('emit ::', emit);
  //   // redux action을 dispatch 할 경우 action인자로 넘어온다.
  //   console.log('action ::', action);
  //
  //   if (Array.isArray(action)) {
  //     action.forEach(emit);
  //     return;
  //   }
  // }
});

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
