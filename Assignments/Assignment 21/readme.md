# Fixing the Cart Problems

## Overview
The current implementation of the cart does not persist data across page reloads. This results in a poor user experience where saved cart items are lost upon refreshing the page. However, since the cart data is available in the database, we can resolve this issue by retrieving the data when the user reloads the page.

## Solution
To ensure a seamless experience, we will:
- Fetch the saved cart items from the database when the page reloads.
- Handle various states of the request, including loading, success, and error.
- Show appropriate notifications to inform the user about the status of the request.

## Implementation Steps
1. **Fetch Cart Data on Page Load**
   - Make a `GET` request to the server to retrieve the saved cart items.
   - Populate the cart state with the retrieved data.
   
2. **Handle API Responses**
   - Display a **loading** state while fetching data.
   - Show a **success** message when the cart is successfully restored.
   - Handle errors gracefully by displaying an **error notification**.

3. **Improve User Experience**
   - Ensure smooth loading indicators.
   - Provide feedback to users when data is being fetched, successfully retrieved, or when an error occurs.

## Action Creator Thunk Design Pattern
### What is it?
The **Action Creator Thunk** design pattern is a middleware-based approach in Redux that allows action creators to return functions instead of plain action objects. These functions can perform asynchronous operations, such as API calls, and then dispatch actions based on the result.

### Why do we need it?
By default, Redux actions are synchronous, meaning they cannot handle side effects like API calls. Using Thunks, we can delay action dispatching and handle asynchronous logic inside our actions.

### Advantages of Action Creator Thunk
- Allows **asynchronous logic** within Redux actions.
- Simplifies API calls by keeping them inside actions instead of components.
- Helps in **better state management** by dispatching different actions for loading, success, and error states.
- Keeps the UI responsive by handling API calls asynchronously.

## Expected Deliverables
- A `GET` request to fetch saved cart items when the page reloads.
- Proper error handling and notifications for success, error, and loading states.
- Integration of Redux Thunk to manage asynchronous operations effectively.

By implementing these improvements, users will have a much better shopping experience, ensuring their cart persists across page reloads.
