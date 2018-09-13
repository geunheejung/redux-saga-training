import {delay} from 'redux-saga'
import {fork, call, put, take, takeEvery} from 'redux-saga/effects';
import * as fromReduxs from '../reducers';

// function* takeEvery(pattern, saga, ...args) {
//   const task = yield fork(function* () {
//     while (true) {
//       const action = yield take(pattern)
//       yield fork(saga, ...args.concat(action))
//     }
//   });
//   return task
// }

function* mockTakeEvery(pattern, saga, ...args) {
  while (true) {
    const action = yield take(pattern);
    yield fork(saga, ...args.concat(action));
  }
}

function* subTask() {
  yield call(delay, 1000);
  console.log('SUB_TASK !!!!');
}

function* mainFlow() {
  console.log('hello');
  yield mockTakeEvery('MOCK_FETCH_ACTION', subTask);
  // 이처럼 takeEvery에서 while(true) {} task를 fork이펙트로 non-blocking 해주지 않으면 mainFlow에서는 takeEvery가 blocking하기때문에 다음 yield로 진행이 안된다.
  console.log('END MAIN FLOW ---> (1)');
}

function* mainFlow2() {
  console.log('hello');
  yield takeEvery('MOCK_FETCH_ACTION', subTask);
  yield console.log('END MAIN FLOW ---> (2)');
}

export default [mainFlow, mainFlow2]