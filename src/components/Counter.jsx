import React from 'react';
import {connect} from 'react-redux';
import {incrementAsync, fetchWeatherApi, mockFetchAction} from '../reducers'

const Counter = ({count, incrementAsync, fetchWeatherApi, mockFetchAction}) => {
  console.log(fetchWeatherApi);
  return (
    <div>
      {' '}
      <button onClick={incrementAsync}>
        Increment after 1 second
      </button>
      <hr/>
      <div>
        Clicked: {count} times
      </div>

      <button
        onClick={() => fetchWeatherApi()}
      >
        fetchApi
      </button>
      <button onClick={() => { mockFetchAction() }}>
        mock
      </button>
    </div>
  )
}


export default connect(
  state => {
    return {
      count: state,
    }
  },
  {
    incrementAsync,
    fetchWeatherApi,
    mockFetchAction
  }
)(Counter);