import { delay } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  INCREMENT_ASYNC,
  DECREMENT_FETCH_COUNT,
  FETCH_WEATHER_API,
  incrementAction,
  decrementAction,
  fetchWeatherApi,
} from '../reducers';
import api from '../services/api';

export function* incrementAsnyc() {
  yield call(delay, 1000);
  console.log('dasdas');
  yield put(incrementAction());
}

export function* decrementAsnyc() {
  yield call(delay, 1000);
  console.log(yield 'success setTimeout')
  yield put(decrementAction());
}

export function* watchIncrementAsync() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsnyc);
}

export function* watchDecrement() {
  yield takeEvery(DECREMENT_FETCH_COUNT, decrementAsnyc)
}

export default [
  watchIncrementAsync,
  watchDecrement,
]