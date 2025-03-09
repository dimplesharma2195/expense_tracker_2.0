import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { counter: 0 },
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    incrementBy2(state) {
      state.counter += 2;
    },
    decrementBy2(state) {
      state.counter -= 2;
    },
    incrementBy5(state) {
      state.counter += 5;
    },
    decrementBy5(state) {
      state.counter -= 5;
    }
  }
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;