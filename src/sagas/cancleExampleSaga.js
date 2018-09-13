import {delay} from 'redux-saga';
import {take, fork, cancel, takeEvery, put, call, cancelled} from 'redux-saga/effects';
import * as fromReduxs from '../reducers';

function* subTask3() {
  try {
    console.log('LAST SUBTASK!!!!');
  } finally {
    console.log('CANCELLED -- ST SUBTASK!!!!');
    yield console.log(cancelled());

  }
}

function* subTask2() {
  try {
    console.log('subTask----> 2');
    yield call(subTask3);
  } finally {
    console.log('CANCELLED -- subTask----> 2');
    yield console.log(cancelled());
  }

}

function* subTask1() {
  yield call(delay, 2);
  try {
    console.log('subTask----> 1');
    yield call(subTask2);
  } finally {
    console.log('CANCELLED -- subTask----> 1');
    yield console.log(cancelled());
  }
}


function* testMainFlow() {
  while (true) {
    yield take(fromReduxs.FETCH_WEATHER_API_REQUEST);
    const forkedSubTask = yield fork(subTask1);
    yield call(delay, 1);
    yield cancel(forkedSubTask);
  }
  /*
    각각의 subTask에 대한 진행은 순차적으로 진행되며
    cancel에 의해 task가 제거되는 순서는 아래로 전해진다.
    호출자(비동기 작업을 실행함) 과 피호출자(실행된 task들) 사이의 계약을 보면
    피호출자는 작업을 실행할 책임이 있다. 만약 해당 태스크가 완료되면 (성공 or 에러) 결과는 계속해서 호출자에서 그 호출자로 전달될 것
    즉 피호출자는 플로우를 완료하는 것에 책임이 있다.
    피호출자가 대기 중인 상태에서 호출자가 작업을 취소하기로 결정했다면, 그것은 일종의 신호를 피호출자에게 밑으로 전달한다.
    깊게 대기중인 작업들은 모두 취소된다.

    이러한 취소를 다른 방향으로 전달하는 방법은 태스크의 병합자(joiner)(yield join(task)에 의해 봉쇄된 태스크)는 병합된
    태스크가 취소되면 같이 취소된다.
   */
}

export function* bgSync() {
  yield console.log('bgSync START');
  try {
    yield put(fromReduxs.apiStop());
  } finally {
    if (yield cancelled()) {
      yield console.log('Sync cancelled!! isCancelled ---> ', cancelled())
      yield put(fromReduxs.fetchWeatherApiFaiure('Sync cancelled!!'));
    }
  }
}

export function* mainFlow() {
  while (true) {
    yield take(fromReduxs.FETCH_WEATHER_API_REQUEST);
    // starts the task in the bg
    const bgSyncTask = yield fork(bgSync);

    // wait for the user stop action
    yield take(fromReduxs.API_STOP);
    // user clicked stop. cancle the bg task
    // this will cause the forked bgSync task to jump info its finally block
    yield cancel(bgSyncTask);
  }
}

export default [
  mainFlow,
  // testMainFlow
];