import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../store/counterSlice';

function Counter() {
  const count = useSelector(state => state.counter.counter);
  const dispatch = useDispatch();

  return (
    <div style={{ 
      backgroundColor: 'grey', 
      textAlign: 'center', 
      margin: '1rem auto', 
      padding: '1rem',
      width: '80%',
      borderRadius: '8px'
    }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(counterActions.increment())}>
        Increment by 1
      </button>
      <button onClick={() => dispatch(counterActions.decrement())} style={{ margin: '0 10px' }}>
        Decrement by 1
      </button>
      <br /><br />
      <button onClick={() => dispatch(counterActions.incrementBy2())}>
        Increment by 2
      </button>
      <button onClick={() => dispatch(counterActions.decrementBy2())} style={{ margin: '0 10px' }}>
        Decrement by 2
      </button>
      <br /><br />
      <button onClick={() => dispatch(counterActions.incrementBy5())}>
        Increment by 5
      </button>
      <button onClick={() => dispatch(counterActions.decrementBy5())} style={{ margin: '0 10px' }}>
        Decrement by 5
      </button>
    </div>
  );
}

export default Counter;