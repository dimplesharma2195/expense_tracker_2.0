# Auth Reducer

## Overview
This project focuses on implementing authentication using Redux Toolkit. The goal is to understand why Redux Toolkit simplifies state management compared to the old Redux structure and to implement authentication functionality using `createSlice` and `configureStore`.

## Questions and Answers

### Video 19: Why is Redux Toolkit Better?
Redux Toolkit simplifies state management by:
- **Reducing Boilerplate**: No need to manually define action types, action creators, and reducers separately.
- **Built-in Immer Support**: Allows writing mutative-looking logic (`state.isAuthenticated = true`) while maintaining immutability.
- **Auto-generated Actions**: `createSlice` automatically generates action creators and types.
- **Improved Readability & Maintainability**: Code is cleaner and more structured.

### Passing Payload in Actions
To pass a payload in actions:
- Define an action in `createSlice`:
  ```javascript
  login: (state, action) => { state.isAuthenticated = action.payload }
  ```
- Dispatch an action with a payload:
  ```javascript
  dispatch(authSlice.actions.login(true))
  ```

### Video 20 & 21: Why a Separate `authSlice`?
- Authentication state is **separate** from the counter and should be managed independently.
- Keeping separate slices improves maintainability and avoids unnecessary re-renders.

### Why Use `configureStore`?
- Combines multiple slices into one store.
- Automatically sets up Redux DevTools and middleware.
- Provides a cleaner, more scalable structure.

### Why `state.counter.counter`?
- Since we use `configureStore` with multiple reducers, `counter` is now nested under `state.counter`.
- To access the value, we now have to use `state.counter.counter`.

## Deliverables

### Authentication Functionality
1. **Login Functionality**:
   - Clicking the login button sets `isAuthenticated = true`.

2. **UI Based on Authentication State**:
   - If `isAuthenticated = false`, show the not-logged-in screen.
     - [Not Logged In Screen](https://drive.google.com/file/d/1obJXoA9eHXDfAMUA6OKSoxf3HFtRjgYi/view?usp=sharing)
   - If `isAuthenticated = true`, show the logged-in screen.
     - [Logged In Screen](https://drive.google.com/file/d/1ANxcnTXTxwMQk5Louk5fLNlEMXIWNElv/view?usp=sharing)

3. **Logout Functionality**:
   - Clicking logout sets `isAuthenticated = false` and changes the UI accordingly.
     - [Logged Out Screen](https://drive.google.com/file/d/1obJXoA9eHXDfAMUA6OKSoxf3HFtRjgYi/view?usp=sharing)

## Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the app: `npm start`

## Technologies Used
- React
- Redux Toolkit
- React-Redux

## Conclusion
This project demonstrates how Redux Toolkit simplifies authentication state management by reducing boilerplate and providing a structured approach to managing authentication logic.
