import React from 'react';
import { connect } from 'react-redux';
import { incrementAsync, decrementAction } from '../reducers'

const Counter = ({ count, incrementAsync }) => {
  console.log( count );
  return (
    <div>
    {' '}
    <button onClick={incrementAsync}>
      Increment after 1 second
    </button>
    <hr />
    <div>
      Clicked: {count} times
    </div>
  </div>
  )
}
  

export default connect(
  state => {  
    return {
      count: state,
    }
  },
  { incrementAsync }
)(Counter);