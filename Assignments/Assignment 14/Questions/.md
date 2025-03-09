# Optimizing Redux and Best Practices

## Video 13: Optimizing Redux Code

Watch **Video 13** to understand the optimized way to handle Redux actions and state updates.

### Refactor IncrementBy2 Action
- Update the `IncrementBy2` action to follow the optimized approach as demonstrated by the trainer.

---

## Video 14 & 15: Why Not Mutate State?

### Why Can’t We Do `state.counter++`?
This is a common interview question: **Why should we not mutate the state?**

- Redux state is **immutable**. Directly modifying it (`state.counter++`) leads to unpredictable behavior and makes debugging difficult.
- Instead, always return a **new state object** with the required updates.
- Mutating state directly prevents Redux from detecting changes properly, leading to incorrect updates and re-renders.

---

## Video 16: Identifiers and Reducer Design

### Problems with Identifiers & Suggested Remedies
- Unique identifiers can be problematic if not handled correctly.
- The trainer suggests ensuring unique keys and handling state updates in an immutable way.

### Why Is It a Bad Idea to Keep `counter` and `toggle` in the Same Reducer?
- Combining unrelated pieces of state into one reducer makes code harder to maintain.
- Separate reducers allow better **modularity** and **scalability**.

### Other Issues & Solutions
- **Deeply nested state:** Use **normalization** to store data efficiently.
- **Overcomplicated reducers:** Use utility functions and **createSlice** to simplify logic.

---

## Video 17 & 18: Benefits of `createSlice` and `configureStore`

### Advantages of Using `createSlice`
- **Reduces boilerplate** by combining actions and reducers in one function.
- **Auto-generates action creators**, making the code cleaner and easier to maintain.

### How Can We Mutate State Now? (`state.counter++`)
- With `createSlice`, Redux Toolkit uses **Immer.js** behind the scenes.
- **Immer** allows writing mutable-looking code (`state.counter++`) while maintaining **immutability** internally.

### Why Do We Need `configureStore`?
- **Simplifies store setup** by automatically applying necessary middleware.
- **Enhances debugging** with built-in DevTools support.
- **Handles multiple reducers seamlessly**, making the app more scalable.

---

## Deliverables

1. **Optimize the `IncrementBy2` Action**
   - Refactor the `IncrementBy2` logic using the method from **Video 13**.

2. **Answer Key Redux Questions**
   - Why should we not mutate state directly?
   - What issues arise with identifiers, and how can they be solved?
   - Why separate reducers for different state properties?

3. **Implement Redux Toolkit Best Practices**
   - Use `createSlice` for reducers.
   - Implement `configureStore` to manage multiple reducers effectively.
