# Introduction to Redux

## Watch the video 1 and 2 from the following link and answer the following:

- What are the different types of state?
- What is the difference between each one of them? Explain with examples.
- What is prop drilling? How did Context API of React solve this problem of prop drilling?

---

## Watch video 3 from the above link and answer the following:

- What are the disadvantages of using Context API? Explain with your own examples.
- When should you use Context then?

---

## Watch video 4 from the above link and answer the following:

> **Guys, Redux is like Context API but more performant and easy to manage. That's it. We use it on all React apps. So super important to understand it.**

- What is the central state?
- What does it mean by a component has subscribed to the central state?
- Can the component directly change the values in the central state?
- What are reducer functions?
- What are actions?
- Can you explain the core Redux concepts? (**Favourite Interview Question - Asked in 99% of React interviews**)

---

## Watch video 5 from the above link and answer the following:

- What does `npm init` do?
- `npm init -y`, what does `-y` do here?
- Why do we see `counter value = 2` when the trainer writes `store.dispatch({ type: 'increment' })`?

---

## Deliverable

- Currently, when you call an action with type `increment`, the counter increases. Try increasing the counter by value `5` by dispatching the action `5` times.
- Now try calling the action with type `decrement`. Does the counter increase or decrease in value?
- Can you write the reducer function in such a manner that when the action with type `decrement` is called, the counter reducer should decrease in value? *(If stuck for long, check Hint 1.)*

# Answers to Questions

## What Are the Different Types of State?

### Local State

**Definition:** Managed within a single component (using hooks like `useState` in functional components or `this.state` in class components).

**Example:** Toggling a modal’s visibility or handling a form input.

**When to Use:** Best for temporary UI states that do not affect other parts of the app.

### Global State

**Definition:** Shared across many components. Managed via tools such as the Context API or state-management libraries like Redux.

**Example:** User authentication data, theme settings, or language preferences.

**When to Use:** When multiple components require access to the same piece of data.

### Server State

**Definition:** Data that comes from an external source, such as an API.

**Example:** A list of products fetched from a remote server.

**When to Use:** When you need to synchronize data from a backend with your UI. This often requires additional logic for caching, loading states, and error handling.

### URL State

**Definition:** Information stored in the URL, such as query parameters or the current route.

**Example:** Pagination numbers, search queries, or route parameters.

**When to Use:** When you want the state of your app to be shareable via a URL or when the browser’s navigation history should reflect the app’s state.

---

## What Is Prop Drilling and How Does Context API Solve It?

### Prop Drilling:

**Definition:** The process of passing data through several layers of components that do not necessarily need the data themselves, only to get it to a deeply nested component.

**Example:** If a theme value is defined in the top-level component and must be passed through many intermediate components before reaching a Button component that uses it, each component in the chain must accept and forward the prop.

### Context API Solution:

**How It Works:** By creating a context (using `React.createContext`) and wrapping the component tree (or a part of it) with a Provider, any nested component can directly consume the value using the `useContext` hook.

**Benefit:** This removes the need to pass the prop through each intermediary, reducing clutter and simplifying maintenance.

---

## Video 3 – Disadvantages of Context API and When to Use It

### Disadvantages of Using Context API

#### Unnecessary Re-renders:

**Explanation:** Any update to the context value will force all components consuming that context to re-render—even if they only use part of the data.

**Example:** Imagine a context holding both user information and a frequently updating counter. Even if a component only cares about the user info, it will re-render every time the counter changes.

#### Over-Coupling and Complexity:

**Explanation:** Relying on context for frequently changing data can couple unrelated components, making the app harder to optimize and maintain.

**Example:** Using one large context for multiple types of state (e.g., UI settings, user data, and live data) can lead to performance issues and bugs.

#### Limited Debugging Tools:

**Explanation:** Unlike Redux, which offers robust debugging tools (e.g., Redux DevTools), Context API does not have built-in solutions for tracking state changes.

**Example:** Tracing which component causes a re-render due to context changes can be more challenging in larger applications.

### When Should You Use Context API?

#### Ideal Use Cases:

- For data that is global but changes infrequently, such as themes, locale settings, or user authentication tokens.
- When your app is small to medium in size, and you don’t need the extra features (like middleware, time travel debugging, etc.) provided by more complex state management solutions like Redux.

#### Avoid for High-Frequency Updates:

For state that updates very frequently (e.g., live feeds or rapidly changing counters), consider alternatives that offer more granular control over re-renders.

---

## Video 4 – Core Redux Concepts

### What Is the Central State?

**Definition:** Also known as the “store,” it is the single source of truth for your entire application’s state.

**Role:** It holds all the state in one place, making the data flow predictable and easier to debug.

### What Does It Mean When a Component Has Subscribed to the Central State?

**Explanation:** When a component subscribes to the store, it listens for any changes to the state. If the part of the state it depends on updates, the component re-renders.

**Example:** A counter component that automatically updates when the store’s counter value changes.

### Can the Component Directly Change the Values in the Central State?

**Answer:** No. Components can only change the state by dispatching actions. The state is updated by pure functions called reducers, ensuring predictable state transitions.

### What Are Reducer Functions?

**Definition:** Pure functions that take the current state and an action as inputs and return a new state based on that action.

**Example:** A reducer for a counter:

```js
const initialState = 0;
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}
```

**Key Point:** Reducers must be pure (no side effects) and return a new state without mutating the existing one.

### What Are Actions?

**Definition:** Plain JavaScript objects that describe a change that should occur in the state. They must have a `type` property.

**Example:** An action to increment a counter:

```js
{ type: 'increment' }
```

**Role:** Actions serve as the only way to trigger a state change, ensuring the flow is clear and predictable.

### Core Redux Concepts (Often Asked in Interviews)

- **Central Store:** The single source of truth for the entire app state.
- **Actions:** Objects that signal what change should occur.
- **Reducers:** Functions that process actions and return new state.
- **Dispatch:** The method used to send an action to the store.
- **Subscriptions:** Mechanism by which components listen to state changes.

#### Flow:
1. An action is dispatched from a component.
2. The reducer processes the action and creates a new state.
3. The store updates and notifies all subscribed components, triggering a re-render if necessary.

---

## Video 5 – npm Initialization and Counter Behavior

### What Does `npm init` Do?

**Explanation:** Initializes a new Node.js project by creating a `package.json` file, which holds project metadata, dependencies, and scripts.

### What Does `npm init -y` Do?

**Explanation:** The `-y` flag automatically accepts the default settings for all configuration options, generating a `package.json` without prompting you for input.

### Why Do We See a Counter Value of 2 When `store.dispatch({type: 'increment'})` Is Called?

#### Possible Explanations:

- **Double Invocation in Development:** Tools like React’s Strict Mode intentionally invoke functions twice to help catch side effects, which can lead to seeing the action applied twice.
- **Initial State Considerations:** The counter might have an initial value other than zero, or the action might be dispatched twice inadvertently.

**Example:** In development mode, if you see the counter increment by 2 after a single dispatch, it may be due to React’s development behavior rather than an error in the reducer logic.
