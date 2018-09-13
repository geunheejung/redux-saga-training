import { delay } from 'redux-saga'
import { fork, call, put, take } from 'redux-saga/effects';

function* fetchTask(number) {
  console.log('START FETCH...' + number);
  yield call(delay, 3000);
};

function* subTask() {
  yield fork(fetchTask, 1);
  yield fork(fetchTask, 2);
  /*
    결합된 fork 이펙트나 yield all[task들] 동작은 동일하다.
    왜냐하면 둘다 이펙트들이 병렬적으로 동작하기때문이다.
    차이가 있다면 fork 이펙트들은 task들이 각각 따로 진행되기에
    yield all처럼 병렬적인 동작들이 끝난 뒤를 보장할수없다.
    1.
    yield fork(fetchTask, 1);
    yield fork(fetchTask, 2);

    2.
    yield [
    call(fetchTask, 1),
    call(fetchTask, 2),
  ];
   */
  yield call(delay, 1000);
};

function* mainFlow() {
  /*
    mainFlow에서 subTask를 취소하면 subTask에서는 call(delay, 1000)를 취소하는것을 의미한다.
   */
  while(true) {
    try {
      yield take('MOCK_FETCH_ACTION');
      // subTask의 모든 명령들이 끝나야 비로소 subTask가 종료된다.
      // 그러므로 non-blocking 이펙트인 fork task들도 모두 종료되어야 한다.
      // subTask에서 에러가 났을경우 yield call(subTask);에서 알아서 에러가 나서 catch로 빠지낟.
      yield call(subTask);
      console.log('END');
    } catch(e) {
      // 각각의 서브테스크에서 에러가 날 경우 에러는 mainFlow까지 전달되어서 catch문에 잡힌다.
    }

  }

}

export default [
  // mainFlow,
]

/*
mainFlow에서 에러를 잡는 이유는 subTask에서 에러가 날 경우 해당 task자체를 취소시켜야 하기 때문이다.
그리고 fork된 태스크에서는 에러를 잡을 수 없다.
fork 내부에서 실패한다면, 해당 task를 fork한 부모가 이를 취소 시커야 하기 때문이다.
 */