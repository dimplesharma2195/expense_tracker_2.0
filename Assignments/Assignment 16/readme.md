# Doing the Expense Tracker the Right Way

## Overview
This project focuses on structuring the Expense Tracker application efficiently using Redux. We will explore file organization, core Redux concepts, and implement key reducers for authentication and expenses.

## Questions and Answers

### Video 23: Why Are We Splitting the File?
- **Maintainability**: As the app grows, keeping all logic in one file makes it harder to manage.
- **Scalability**: Dividing the code into smaller modules makes adding new features easier.
- **Reusability**: Components and reducers can be reused across different parts of the app.

### Logic Behind File Division
The Udemy trainer divides files in a way that separates concerns:
- **Reducers**: Each feature (auth, expenses, etc.) has its own reducer file.
- **Actions**: Separate action creators for better structure.
- **Components**: UI components are structured independently for better reusability.
- **Store**: A centralized store integrates all reducers and middleware.

### Video 24: Core Concepts of Redux
Redux follows a predictable state management pattern:
1. **Store**: The global state container.
2. **Actions**: Objects that describe changes in the state.
3. **Reducers**: Pure functions that update state based on actions.
4. **Dispatch**: Triggers actions to modify the state.
5. **Selectors**: Functions to retrieve specific state values.

### Utilities Explanation
#### `useDispatch`
- A hook that allows components to dispatch actions to the Redux store.
- Example:
  ```javascript
  const dispatch = useDispatch();
  dispatch(login({ token: 'abc123' }));
  ```

#### `combineReducers`
- A function that merges multiple reducers into one.
- Example:
  ```javascript
  const rootReducer = combineReducers({ auth: authReducer, expenses: expensesReducer });
  ```

#### `useSelector`
- A hook to select data from the Redux store.
- Example:
  ```javascript
  const expenses = useSelector(state => state.expenses);
  ```

### When to Use Redux vs. Context API
- **Use Redux** when:
  - State is shared across multiple components deeply nested in the tree.
  - The app has complex state transitions.
  - Predictability and debugging (Redux DevTools) are needed.
- **Use Context API** when:
  - State is simple and doesn’t require extensive manipulation.
  - Performance optimizations with selective re-renders are necessary.
  - The project is small or medium-sized.

## Deliverables

### Implementing Redux in the Expense Tracker
The Expense Tracker is a large-scale application, so managing state properly is crucial. We will implement the following reducers:

1. **Auth Reducer**
   - Stores user login status, bearer tokens, and user ID.
   - Uses bearer tokens when making API calls requiring authentication.

2. **Expenses Reducer**
   - Stores all user-entered and backend-fetched expenses.
   - If expenses exceed ₹10,000, an "Activate Premium" button is displayed.
