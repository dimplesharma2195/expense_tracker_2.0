# Subscribing and Dispatching Actions

## Learning Resources

Watch **Video 9** from the following link and answer:

- **What does the Provider exactly do?**
- **Why do we need to provide it with a store?**

Watch **Video 10** and answer:

- **What is the need for `useSelector`? What does it do?**
- **What does `useSelector` return?**

Watch **Video 11** and code along with the trainer to understand action dispatching in Redux.

---

## Deliverables

1. **Add an `IncrementBy5` Button:**
   - Create a button on the screen labeled **IncrementBy5**.
   - On click, dispatch the relevant action type to increase the counter by 5.

2. **Add a `DecrementBy5` Button:**
   - Create a button on the screen labeled **DecrementBy5**.
   - On click, dispatch the relevant action type to decrease the counter by 5.

# Answers to the questios

## Video 9: The Provider

### What Does the Provider Exactly Do?
**Role:**
- The `<Provider>` component from React-Redux wraps your application (or part of it) and makes the Redux store available to all nested components.

**How It Works:**
- It uses React’s Context API under the hood to pass down the store, so any component can access it via hooks (like `useSelector` and `useDispatch`) or the older `connect` function.

### Why Do We Need to Provide It With the Store?
**Centralized State Access:**
- The Redux store holds the entire state tree for your application. Providing the store through `<Provider>` ensures that every component in the component tree can access and interact with the centralized state.

**Consistency:**
- It guarantees that all components share the same instance of the store, maintaining consistency across your app.

---

## Video 10: useSelector

### What Is the Need for `useSelector`? What Does It Do?
**Purpose:**
- The `useSelector` hook allows functional components to extract and subscribe to parts of the Redux store’s state.

**Functionality:**
- Instead of connecting components through higher-order components, `useSelector` gives you direct access to the state, letting you select exactly what you need for that component.

### What Does `useSelector` Return?
**Return Value:**
- It returns the selected slice of state from the Redux store. The component re-renders whenever that specific piece of state changes.
