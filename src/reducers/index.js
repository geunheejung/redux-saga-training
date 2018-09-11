export const INCREMENT_FETCH_COUNT = 'INCREMENT_FETCH_COUNT';
export const DECREMENT_FETCH_COUNT = 'DECREMENT_FETCH_COUNT';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';

export const incrementAsync = () => ({ type: INCREMENT_ASYNC });
export const incremenetAction = () => ({ type: INCREMENT_FETCH_COUNT });
export const decrementAction = () => ({ type: DECREMENT_FETCH_COUNT });

export default (state = 0, action) => {
  switch(action.type) {
    case INCREMENT_FETCH_COUNT:
      return state + 1;
    default:
      return state;
  }
}