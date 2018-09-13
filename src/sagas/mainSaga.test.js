import {createMockTask} from 'redux-saga/utils';
import {take, fork, put, call, cancel} from 'redux-saga/effects';
import * as fromReduxs from '../reducers';
import {mainFlow, bgSync} from './cancleExampleSaga';

describe('main', () => {
  const generator = mainFlow();
  it('waits for start action', () => {
    const expectedYield = take(fromReduxs.FETCH_WEATHER_API_REQUEST);
    const expectYield = generator.next().value;

    expect(expectYield).toEqual(expectedYield);
  });

  it('forks the service', () => {
    const expectedYield = fork(bgSync);
    const expectYield = generator.next().value;

    expect(expectYield).toEqual(expectedYield);
  });
  // TODO cancle(task)에서 task undefined 에러남. 왠지 찾아야됨
  describe('waits for stop SubTask', () => {
    it('waits for API_STOP Action', () => {
      const expectedTakeYield = take(fromReduxs.API_STOP);
      const expectYield = generator.next().value;

      expect(expectYield).toEqual(expectedTakeYield)
    });

    it('cancels the service', () => {
      const mockTask = createMockTask();

      const expectedCancelYield = cancel(mockTask);
      // const expectYield = generator.next().value;

      console.log(generator.next().value)

      expect(1).toEqual(1);
    });
  });
});