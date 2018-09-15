Redux-saga 트레이닝
참고: [https://mskims.github.io/redux-saga-in-korean/]

### 용어 정리
createSagaMiddleware(options)

Redux middleware를 생성하고,
rootSagas와 Redux Store를 연결한다.

options
	- sagaMonitor: 만약 Saga 모니터가 제공되는 경우 미들웨어로 전달되는 이벤트들을 sagaMonitor에 전달한다.




Effect
	- saga 미들웨어에 의해 실행될 지침이 포함된 일반 Javascript Object이다.
	- 이펙트를 호출할 경우 미들웨어에게 해당 호출된 이펙트에 대한 작업을 하라고 작업에 대한 정보를 Plain Object로 전해줌.

Task
	- background 에서 실행되는 하나의 process
	- redux-saga에서 background에 task를 생성하기 위해서는 fork effect를 사용함으로써 만듬.
	- background에서 작업됨으로 여러 작업을 동시에 사용 가능

Blocking/Non-blocking call

function* saga() {
  yield take(ACTION)              // Blocking: will wait for the action
  yield call(ApiFn, ...args)      // Blocking: will wait for ApiFn (If ApiFn returns a Promise)
  yield call(otherSaga, ...args)  // Blocking: will wait for otherSaga to terminate

  yield put(...)                   // Non-Blocking: will dispatch within internal scheduler

  const task = yield fork(otherSaga, ...args)  // Non-blocking: will not wait for otherSaga
  yield cancel(task)                           // Non-blocking: will resume immediately
  // or
  yield join(task)                              // Blocking: will wait for the task to terminate
}

Wathcer/Worker


function* watcher() {
  while (true) {
    const action = yield take(ACTION)
    yield fork(worker, action.payload)
  }
}

function* worker(payload) {
  // ... do some stuff
}

watcher: redux action의 dispatch를 watcher하며, fork 이펙트로 worker의 작업을 시작시킨다.
worker: 맡은 작업을 다한뒤 종료된다.

