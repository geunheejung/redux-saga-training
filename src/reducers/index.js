export const INCREMENT_FETCH_COUNT = 'INCREMENT_FETCH_COUNT';
export const DECREMENT_FETCH_COUNT = 'DECREMENT_FETCH_COUNT';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';

export const FETCH_WEATHER_API_REQUEST = 'FETCH_WEATHER_API_REQUEST';
export const FETCH_WEATHER_API_SUCCESS = 'FETCH_WEATHER_API_SUCCESS';
export const FETCH_WEATHER_API_FAILURE = 'FETCH_WEATHER_API_FAILURE';
export const API_STOP = 'API_STOP';
export const mockFetchAction = () => ({ type: 'MOCK_FETCH_ACTION' });


export const incrementAsync = () => ({ type: INCREMENT_ASYNC });
export const incrementAction = () => ({ type: INCREMENT_FETCH_COUNT });
export const decrementAction = () => ({ type: DECREMENT_FETCH_COUNT });

export const fetchWeatherApi = () => ({ type: FETCH_WEATHER_API_REQUEST });
export const fetchWeatherApiFaiure = () => ({ type: FETCH_WEATHER_API_FAILURE });
export const apiStop = () => ({ type: API_STOP });

export default (state = 0, action) => {
  switch(action.type) {
    case INCREMENT_FETCH_COUNT:
      return state + 1;
    default:
      return state;
  }
}