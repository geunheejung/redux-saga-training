import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects';
import { incrementAction } from '../reducers';
import { incrementAsnyc } from './countSaga';

describe('mainFlow saga', () => {
  const gen = incrementAsnyc();
  describe('increment Fetch Count', () => {
    it('delay 에 의해 1000ms 동안 제네레이터 진행이 멈춘다.', () => {
      const expectedObject = call(delay, 1000);
      expect(gen.next().value).toEqual(expectedObject);
    });

    it('put 이펙트에 의해 incrementFetchCount Action이 dispatch 된다.', () => {
      const expectedObject = put(incrementAction());
      expect(gen.next().value).toEqual(expectedObject);
    });

    it('서브 테스크의 모든 작업이 끝나면 제네레이터가 종료된다.', () => {
      expect(gen.next().done).toBe(true);
    });
  });  
});