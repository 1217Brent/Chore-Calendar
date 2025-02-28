# Chore-Calendar

Chore-Calendar is a web application designed to help users manage and organize their household chores efficiently. The application allows users to create, assign, and track chores, ensuring that all tasks are completed on time.

## Features

- **Chore Management**: Create, edit, and delete chores.
- **Assignment**: Assign chores to specific users.
- **Tracking**: Track the completion status of chores.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/chore-calendar.git
    cd chore-calendar
    ```

2. Install dependencies for the frontend:
    ```bash
    cd my-react-app
    npm install
    ```

3. Install dependencies for the backend:
    ```bash
    cd backend
    npm install
    ```

4. Create a `.env` file in the `backend` directory and add your Firebase configuration:
    ```env
    FIREBASE_API_KEY=your_api_key
    FIREBASE_AUTH_DOMAIN=your_auth_domain
    FIREBASE_PROJECT_ID=your_project_id
    FIREBASE_STORAGE_BUCKET=your_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    FIREBASE_APP_ID=your_app_id
    ```

## Usage

1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

2. Start the frontend development server:
    ```bash
    cd my-react-app
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.