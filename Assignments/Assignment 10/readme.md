# Integrating Expenses with Firebase

### Problem Statement

Currently, the main issue with the app is that expenses are not being stored in any database.
If the user refreshes the page, all the expenses are lost, which is not ideal.
To solve this, we need to integrate our React app with Firebase Backend APIs and Firebase Realtime Database.

---

### Setting Up Firebase Database

1. Follow the provided documentation or video to configure the Firebase Realtime Database.
2. Ensure you understand how to perform CRUD (Create, Read, Update, Delete) operations with Firebase Realtime Database.
3. Watch the tutorial explaining how to make GET and POST requests using Firebase APIs.

---

### Deliverables

1. **Storing Expenses in Firebase**
   - When the user adds an expense, store it in Firebase Realtime Database.
   - Use Firebase APIs to send a POST request when a new expense is added.
   - Display the newly added expense on the screen once a **200 Success** response is received from Firebase.

2. **Fetching Expenses on Page Load**
   - When the user refreshes the page, make a GET request to fetch all previously stored expenses from Firebase.
   - Display the retrieved expenses on the screen to ensure persistence across sessions.

This will ensure that expenses are retained even after a page refresh and improve the usability of the application.
