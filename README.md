# Library Management System

This is a simple Library Management System where users can borrow and return books.

# https://borrowbooks.netlify.app

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Users can view the list of available books.
- Users can borrow books.
- Users can return books.
- Transaction history for each user.
- ...

## Technologies

- **Frontend:** React
- **Backend:** Node.js, Express, MongoDB
- **State Management:** React Hooks
- **Authentication:** JWT
- **Styling:** Bootstrap
- ...

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/book-management-system.git
```
2. Navigate to the project directory:

```bash
cd book-management-system
```

3. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```
4. Set up the MongoDB database.

5. Create a .env file in the server directory with the following content:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
6. Run the development server:

```bash
# Run frontend and backend concurrently
cd ../
npm run dev
```

7. Open your browser and navigate to http://localhost:3000 to access the application.

## Usage

- Users can browse the list of available books.
- Users can borrow a book by clicking the "Borrow" button.
- Users can return a book by clicking the "Return" button.
- Users can view their transaction history on the main page.

## API Endpoints

- GET /book: Get the list of available books.
- GET /users/:id/transactions: Get the transaction history for a specific user.
- POST /users/:id/transactions: Borrow a book.
- PUT /users/:id/transactions/:transactionId: Return a book.

## Contributing

Feel free to contribute to the project. Open an issue or create a pull request with your suggestions and improvements.



