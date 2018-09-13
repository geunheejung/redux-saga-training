import {call, all, fork} from 'redux-saga/effects';
import countSaga from './countSaga';
import fetchWeatherSaga from './fetchWeatherSaga';
import cancleExampleSaga from './cancleExampleSaga';
import forkExampleSaga from './forkExample';
import helperFnExampleSaga from './helperFnExample';


const forkAll = sagaList => {
  const sagas = sagaList.map(saga => fork(saga));

  return sagas;
};

function* mainFlow() {
  yield all(forkAll([
    ...fetchWeatherSaga,
    ...countSaga,
    ...cancleExampleSaga,
    ...forkExampleSaga,
    ...helperFnExampleSaga,
  ]));
}


export default mainFlow;

/*
yield delay(ms)와 yield call(delay, ms)의 차이점은
전자는 delay(1000) yield 구문은 next의 호출자로 넘겨지기 전에 실행되고 호출자가 얻게 되는것은
Promise 이다.
후자는 call(delay, ms) yield 구문 또한 next의 호출자에게 넘겨지는데 put과 유사한 call은
미들웨어에게 주어진 함수와 인자들을 실행하라는 명령을 하는 이펙트를 리턴한다.
사실 put, call은 스스로 어떤 dispatch 나 비동기적인 호출을 하지 않고 
단지 순수한 자바스크립트 객체를 돌려준다.
put({type: 'INCREMENT'}) // => { PUT: {type: 'INCREMENT'} }
call(delay, 1000)        // => { CALL: {fn: delay, args: [1000]}}



*/

// incrementAsync는 제네레이터 함수이다.
/*
  .next() 메서드로 이터레이터 오브젝트를 소비할 때 마다 iteratorResultObject가 반환되는데
  { done: boolean, value: any }의 형태에서 value 부분에 yield에 의해 사용되는 redux-saga 이펙트들이 반환된다.
*/