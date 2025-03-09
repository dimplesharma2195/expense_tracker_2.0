# Forgot Password Workflow

## Problem

Once a user has logged out, there is a high chance that they might forget their password. What do we do now?

## Solution

1. **Add a "Forgot Password" Button:**
   - When the user clicks on the "Forgot Password" button, redirect them to a password reset page.
   - Reference design: [Forgot Password Screen](https://drive.google.com/file/d/1P0HWepSUWoY7a7akbtPti07ZbqdPiRhr/view?usp=sharing).

2. **Password Reset Process:**
   - Allow the user to enter their registered email ID.
   - Call the Firebase API to initiate the password reset process.
   - Show a loading indicator on the screen until a response is received from Firebase.
   - Follow the Firebase documentation for password reset implementation.

3. **Email Verification & Reset Link:**
   - The user will receive a password reset link on the provided email ID.
   - The user must open the email and click on the link to reset their password.

4. **Logging in With New Password:**
   - After resetting the password, the user should be able to log in with the new credentials.
   - Verify that the updated password allows successful authentication.
