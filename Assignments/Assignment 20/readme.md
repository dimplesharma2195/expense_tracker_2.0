# Doing Network Calls and Handling Responses the Right Way

## Questions & Answers

### Video 5 & 6: Where to Call Async Code and Frontend Work
**1. What are the 2 places where we can call asyncCode (HTTP request) when using reducers?**
   - We can call async code in **Redux Thunks** or in **useEffect hooks** in React components.
   
**2. Why do we have to do a lot of work on the frontend when making backend calls?**
   - The frontend needs to handle loading states, error handling, updating UI, and managing local state to ensure a smooth user experience.

### Video 7: Why Reducers Should Not Modify Values Directly
**1. Why should we not do `cart.totalQuantity = cart.totalQuantity + 1`?**
   - Redux state is immutable. Directly modifying state like this can cause unexpected behavior and debugging issues.

**2. What is the problem with data transformation at the component level and not at the reducer level?**
   - Transforming data at the component level leads to **inconsistencies** across components, while handling it in reducers ensures **centralized and predictable** state management.

### Video 8: Fetching Data and HTTP Methods
**1. Why does he put `cart` as a dependency in `useEffect`?**
   - To ensure that the fetch function is called whenever the `cart` state changes, keeping backend data in sync with the frontend.

**2. When will the fetch function be called?**
   - The function will be called whenever there is a change in the cart state.

**3. Why is the trainer using the PUT method and not POST?**
   - `PUT` replaces the entire cart object in the backend, ensuring that the cart is fully updated instead of appending duplicate data like `POST` would.

## Deliverables - [DIY]

### Error Handling in API Calls
When making API calls, errors are not currently being handled properly. Implement the following:

1. **Show Loading State**
   - Display this screen while sending a request:
     - [Loading Screen](https://drive.google.com/file/d/1UnK91c8LA-n27Xx7oKx_LKDqizttRXvn/view?usp=sharing)

2. **Handle Request Failure**
   - If the request fails, show this screen:
     - [Error Screen](https://drive.google.com/file/d/1PJo12H2pjS2KkjTsBNHWzQvTBMO8VOCw/view?usp=sharing)

3. **Handle Successful Request**
   - If the request succeeds, show this screen:
     - [Success Screen](https://drive.google.com/file/d/1yYInsgQEGYXDKm2To0uXHpXrDxZoE_Zi/view?usp=sharing)

4. **Use Existing Notification Component**
   - Utilize the **Notification component** from the UI folder.
   - Store notifications in `state.notification` inside `uiSlice`.
   - Conditionally render the notification based on its state.

### Fix the Issue Mentioned in Video 8
- The trainer highlights a **major issue** with the current app. Identify and fix it.

### Stuck? 🤔
- If you get stuck for **more than 2 hours**, watch Video 9 for guidance.
- Trying on your own first will help you understand everything better.
