# Verify User Email

## Problem Statement

1. If the email ID is not verified, users can impersonate others by using fake or stolen email IDs.
2. Users might enter incorrect email addresses due to typos.
3. If users forget their password and their email is not verified, they won’t be able to retrieve their account.

## Deliverables

1. **Verify Email Button:**
   - Display a **"Verify Email"** button on the user’s screen once they have successfully logged in.

2. **Send Verification Email:**
   - When the user clicks the button, send a verification email containing a one-time link using Firebase.
   - Use the Firebase API: [Send Email Verification](https://firebase.google.com/docs/reference/rest/auth#section-send-email-verification).

3. **User Action:**
   - The user must check their email inbox, locate the verification email, and click the link to verify their email.

4. **Error Handling:**
   - Handle all potential errors mentioned in the Firebase documentation (e.g., expired links, invalid email formats, etc.).
