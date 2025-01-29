# My Commerce App

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   To obtain a valid API key:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings
   - Under "Your apps", copy the `apiKey` value

3. Run the development server:
   ```
   npm start
   ```

## Deployment

Follow the instructions in the main README.md file for deploying to GitHub Pages.
