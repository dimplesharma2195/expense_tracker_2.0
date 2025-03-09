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
    case 'INCREMENTBY5':
      return state + 5;
    case 'DECREMENTBY5':
      return state - 5;
    default:
      return state;
  }
}

const store = createStore(counterReducer);

function Counter() {
  const count = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Counter: {count}</h1>
      <div>
        <button onClick={() => dispatch({ type: 'increment' })}>
          Increment by 1
        </button>
        <button onClick={() => dispatch({ type: 'decrement' })} style={{ margin: '0 10px' }}>
          Decrement by 1
        </button>
        <br /><br />
        <button onClick={() => dispatch({ type: 'INCREMENTBY2' })}>
          Increment by 2
        </button>
        <button onClick={() => dispatch({ type: 'DECREMENTBY2' })} style={{ margin: '0 10px' }}>
          Decrement by 2
        </button>
        <br /><br />
        <button onClick={() => dispatch({ type: 'INCREMENTBY5' })}>
          Increment by 5
        </button>
        <button onClick={() => dispatch({ type: 'DECREMENTBY5' })} style={{ margin: '0 10px' }}>
          Decrement by 5
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