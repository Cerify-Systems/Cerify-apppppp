

# Cerify Web App Frontend

Cerify is a platform that allows users to upload and manage smart contracts using blockchain technology. It ensures security, transparency, and efficiency by providing a tamper-proof and cryptographically secure environment for smart contracts. The frontend of Cerify is built with React and connected to a Firebase backend.

## Table of Contents

- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Setting Up Firebase](#setting-up-firebase)
- [Available Scripts](#available-scripts)
  - [`npm start`](#npm-start)
  - [`npm test`](#npm-test)
  - [`npm run build`](#npm-run-build)
  - [`npm run eject`](#npm-run-eject)
- [Deployment](#deployment)
- [Learn More](#learn-more)
- [Troubleshooting](#troubleshooting)

## Project Structure

The project structure follows the standard Create React App format with additional folders specific to Cerify:

```
cerify-frontend/
│
├── public/                # Static files
├── src/                   # Main source code
│   ├── components/        # React components
│   ├── pages/             # Page components (Home, Dashboard, etc.)
│   ├── services/          # API and Firebase services
│   ├── styles/            # CSS and styling files
│   ├── App.js             # Main App component
│   ├── index.js           # Entry point of the application
│   └── firebaseConfig.js  # Firebase configuration
│
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## Environment Variables

Create a `.env` file in the root of your project to set up your environment variables. The `.env` file should include the Firebase configuration and any other sensitive information:

```plaintext
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

## Setting Up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Set up Firestore for database needs and configure Firebase Authentication if required.
3. Copy the Firebase configuration details into the `firebaseConfig.js` file and `.env` file.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
Tests ensure the reliability of the code and validate the expected behavior of the components.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance. 

The build is minified, and the filenames include the hashes.  
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**  

Ejecting allows you to have full control over the configuration files and dependencies.

## Deployment

The Cerify web app can be deployed using services like Firebase Hosting, Vercel, or Netlify. For Firebase Hosting:

1. Install Firebase CLI: `npm install -g firebase-tools`.
2. Log in to Firebase: `firebase login`.
3. Initialize Firebase in your project: `firebase init`.
4. Deploy your app: `firebase deploy`.

For detailed instructions on deploying to other platforms, refer to their respective documentation.

![image](https://github.com/user-attachments/assets/b31695ab-e254-4dca-8c89-0603a22f990b)



## Database
The Cerify Webapp has a Firebase Database connected with it, the screeenshot is mentioned in the documentation.

![image](https://github.com/user-attachments/assets/54cd12e7-31dd-4bb4-a6ca-efdcda9c2872)
![image](https://github.com/user-attachments/assets/e591444a-4212-491b-a0c2-4741dc854bbc)


## Learn More

- [React Documentation](https://reactjs.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)

## Troubleshooting

- **Error: `npm run build` fails to minify**: Ensure that all dependencies are compatible with your project setup.
# Cerify-web
# cerify-contracts
