# Edit User Details

## Problem with the Current App

- When the user updates their profile and refreshes the page, the saved data is lost, and the profile page again shows as incomplete.
- The data is actually saved in the Firebase database, but it is not being fetched on page load.

## Solution

1. **Fetch User Data from Firebase:**
   - Make a **GET request** to the Firebase API with the `idToken`.
   - Refer to the Firebase documentation to implement this properly.

2. **Pre-Fill the Form with Existing Data:**
   - Once the data is retrieved from Firebase, populate the input fields with the saved values.
   - Allow users to edit their details as needed before updating.

3. **Ensure Data Persistence:**
   - After making changes, update the profile data back to Firebase so that it remains available even after a page refresh.
