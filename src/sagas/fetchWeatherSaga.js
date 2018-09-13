import { delay } from 'redux-saga';
import { call, fork, race, cancel, take, takeEvery } from 'redux-saga/effects';
import api from "../services/api";
import { FETCH_WEATHER_API_REQUEST, INCREMENT_ASYNC } from "../reducers";

export function* fetchData() {
  yield call(delay, 5000);
  console.log(yield 'success 2');
};

export function* fetchData2() {
  yield call(delay, 3000);
  console.log(yield 'success3');
}

export function* watchWeatherFetchFlow() {
  while (true) {
    // take이펙트에 인자에 배열 형태의 actionType들을 넘겨주면 멀티플하게 watching가능하다.
    yield take([FETCH_WEATHER_API_REQUEST, INCREMENT_ASYNC]);
    // call에 의해 서브테스크로 넘어갈 경우 서브테스크가 끝날때까지 메인플로우는 봉쇄되어있다.
    // 그에반해 fork일 경우 메인 플로우가 서브태스크가 끝날때까지 해당 흐름에서 멈춰있는것이 아닌
    // 새로운 가지를 만들어서 그 가지에서 서브태스크가 시작되고 메인플로우는 현재가지에서 쭉 진행하는 비봉쇄다.

    // yield fork(fetchData);

    // fork이펙트에 의해 추가로 생성돤 가지의 task를 종료시키기 위해서 cancle라는 이펙트를 사용해야한다.
    // cancle 이펙트에 의해 생성돤 가지를 제거했을 때 서브태스크에서는 try ~ catch의 finally 문에서 cancelled 이펙트로
    // 현재 생성된 서브태스크가 cancle에 의해 제거되는지 알 수 있다.
    // finally문은 모든 종류의 완료에서 실행되기 때문(return, error로 강제 취소됨)

    // race는 비봉쇄 이펙트가 동시에 시작되었을 때 경쟁을 붙혀서 먼저 끝맞춘 태스크를 채택하는 방식인데
    // 여기서 특징은 race에서 진 태스크를 종료시킨다는것이다.
    /*
      yield race({
      task: call(fetchData),
      cancel: take(INCREMENT_ASYNC),
    })
     */

    // javascript의 제네레이터에서 yield* expression
    /*
    문법에서 expression부분에 또다른 이터러블 객체나 제네레이터 함수를 호출할 경우 해당 이터러블을 소비할수있다.
      yield* fetchData();
     */

    // non-blocking task가 cancle 이펙트에 의해 제거될 경우
    /*
      non-blocking 이펙트중하나인 fork이펙트의 인자로 서브 태스크를 보냈을 경우 fork이펙트의 호출에 대한 반환값은
      생성된 서브태스크에 대한 정보가 객체에 담겨있는것같다.
      그래서 .isCancelled() 메서드로 cancle되었는지에 대한 유무를 알수있다.

      const fetchDataFlow = yield fork(fetchData);
      console.log(fetchDataFlow);
      yield call(delay, 3000);
      yield console.log('1');
      yield cancel(fetchDataFlow);
      console.log(fetchDataFlow.isCancelled());
     */
  }
}

export default [
  watchWeatherFetchFlow,
];
