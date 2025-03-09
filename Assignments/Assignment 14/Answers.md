## Video 13 – Optimized Code for incrementBy2
Using Redux Toolkit, we can simplify reducer logic by writing “mutative” code that is actually handled immutably under the hood. Instead of using a switch-case structure, we define a reducer inside a slice, making the logic more concise and readable.

### Optimized Counter App with createSlice and configureStore
```javascript
import React from 'react'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { counter: 0 },
  reducers: {
    increment: state => { state.counter++ },
    decrement: state => { state.counter-- },
    incrementBy2: state => { state.counter += 2 },
    decrementBy2: state => { state.counter -= 2 },
    incrementBy5: state => { state.counter += 5 },
    decrementBy5: state => { state.counter -= 5 }
  }
})

const store = configureStore({ reducer: counterSlice.reducer })

function Counter() {
  const count = useSelector(state => state.counter)
  const dispatch = useDispatch()
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>Increment by 1</button>
      <button onClick={() => dispatch(counterSlice.actions.decrement())} style={{ margin: '0 10px' }}>Decrement by 1</button>
      <br /><br />
      <button onClick={() => dispatch(counterSlice.actions.incrementBy2())}>Increment by 2</button>
      <button onClick={() => dispatch(counterSlice.actions.decrementBy2())} style={{ margin: '0 10px' }}>Decrement by 2</button>
      <br /><br />
      <button onClick={() => dispatch(counterSlice.actions.incrementBy5())}>Increment by 5</button>
      <button onClick={() => dispatch(counterSlice.actions.decrementBy5())} style={{ margin: '0 10px' }}>Decrement by 5</button>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}

export default App
```

## Video 14 & 15 – Why We Should Not Mutate the State Directly

### Why Not Do `state.counter++`
- In plain Redux, state is immutable, meaning direct mutation (e.g., `state.counter++`) is not allowed.
- Direct mutations can cause unpredictable bugs and make state tracking difficult.

### Redux Toolkit Exception
- When using `createSlice`, Redux Toolkit employs Immer under the hood.
- This allows writing code that appears to mutate state (like `state.counter++`), while Immer converts those mutations into immutable updates safely.

## Video 16 – Problems with Identifiers and Reducer Design

### Problems with Identifiers
- Using string literals for action types can lead to typos and inconsistencies.
- Solution: Use constants or `createSlice`, which automatically generates action types and creators.

### Mixing Counter and Toggle in the Same Reducer
- Combining unrelated state slices (e.g., counter and toggle) in a single reducer can make it bloated and harder to maintain.
- It also leads to unnecessary re-renders.

### Other Problems and Suggested Solutions
- **Boilerplate Code:** Redux traditionally involves writing a lot of boilerplate.
- **Tracking Changes:** Harder with large reducers.
- **Maintaining Immutability:** Manually enforcing immutability is error-prone.
- **Solution:** Split state into logical slices, use `combineReducers`, and leverage `createSlice` to enforce best practices.

## Video 17 & 18 – Advantages of createSlice and configureStore

### Advantages of `createSlice`
- Reduces boilerplate by generating action creators and action types automatically.
- Allows simpler reducer logic using Immer for safe state mutations.

### Mutating State with `state.counter++`
- With `createSlice`, you can write mutations like `state.counter++`, but Immer ensures the state remains immutable.

### Use of `configureStore`
- Simplifies store setup.
- Automatically applies middleware (e.g., Redux Thunk).
- Enables Redux DevTools for debugging.
- Provides sensible defaults, reducing manual configuration and errors.
