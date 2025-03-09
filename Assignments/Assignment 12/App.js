import React from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

const initialState = 0;

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;  
    case 'decrement':
      return state - 1;  
    case 'INCREMENTBY2':
      return state + 2;  
    case 'DECREMENTBY2':
      return state - 2;  
    default:
      return state;
  }
}

const store = createStore(counterReducer);

function Counter() {
  const count = useSelector(state => state); 
  const dispatch = useDispatch();

  const incrementByFive = () => {
    for (let i = 0; i < 5; i++) {
      dispatch({ type: 'increment' });
    }
  };

  const incrementByTwo = () => {
    dispatch({ type: 'INCREMENTBY2' });
  };

  const decrementByTwo = () => {
    dispatch({ type: 'DECREMENTBY2' });
  };

  const decrement = () => {
    dispatch({ type: 'decrement' });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Counter: {count}</h1>
      <div>
        <button onClick={() => dispatch({ type: 'increment' })}>
          Increment by 1
        </button>
        <button onClick={incrementByFive} style={{ margin: '0 10px' }}>
          Increment by 5
        </button>
        <button onClick={incrementByTwo} style={{ margin: '0 10px' }}>
          Increment by 2
        </button>
        <button onClick={decrement} style={{ margin: '0 10px' }}>
          Decrement by 1
        </button>
        <button onClick={decrementByTwo}>
          Decrement by 2
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;