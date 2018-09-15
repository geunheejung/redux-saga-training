import { delay, buffers } from 'redux-saga';
import { take, cancel, fork, call, actionChannel, throttle } from 'redux-saga/effects';
import * as fromReduxs from '../reducers';

export function* workLog() {
  yield call(delay, 500);
  yield console.log('test');
}

export function* actionChannelExampleFlow() {
  // 1- Create a channel for request actions
  // redux-saga에서 제공하는 actionChannel 기능을 이용하면
  /*
    이전에는 take 이후 call 이펙트와 같이 현재 flow를 bloking하는 이펙트가 발생할 경우 해당 작업에서 blocking되어서 blocking 작업이 끝날때까지 Action을 task에서 받지 못하는 문제가 있다.
    또는 fork와 같은 non-blocking 작업으로 할 경우 blocking 이펙트일 때의 문제는 해결할 수 있지만 non-blocking으로 동작하는 fork들에 대한 작업 순서는 보장되어있지않다.
    actionChannel이라는 채널을 생성한 뒤 처리되지 않은 액션을 대기열에 집어넣고, 현재의 작업이 완료되었으면 대기열에서 다음것을 가져오도록 하면 take 이펙트 이후 call 이펙트에 의해 task가 blocking 되었다하더라도 계속 Action을 받을테고 Action은 대기열에 들어감으로 해결할 수 있다.
    그리고 non-blocking인 fork 이펙트일때의 문제점?인 fork들의 작업들에 대한 순서또한 actionChannel 채널을 생성하면 들어온 순서대로 작업이 진행되기때문에 순서가 보장된다.
    액션 채널은 take(pattern) 처럼, 같은 규칙을 사용하여 해석되는 패턴이 있는 곳에 yield actionChannel(pattern)를 사용.
    take(pattern)과 yield actionChannel(pattern)의 차이점은
      - Saga가 아직 그들을 처리할 준비가 되지 않았다면(blocking) 되었을 경우 actionChannel은 들어오는 메세지를 버퍼링할 수 있다.
   */
  const requestChan = yield actionChannel(fromReduxs.FETCH_WEATHER_API_REQUEST, buffers.sliding(5));
  while (true) {
    // 2- take from the channel
    yield take(requestChan);
    // 3- Note that we're using a bloking call
    yield call(console.log, requestChan);
    yield call(workLog);
  }
}

export function* eventChannelExampleFlow() {
  let task;

  while (true) {
    yield take(fromReduxs.FETCH_WEATHER_API_REQUEST);

    if (task) yield cancel(task);

    task = yield fork(workLog);
  }
}

export default [
  // actionChannelExampleFlow,
  eventChannelExampleFlow,
];