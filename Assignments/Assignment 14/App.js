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