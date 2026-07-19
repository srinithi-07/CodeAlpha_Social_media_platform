# CodeAlpha Social Media Platform

CodeAlpha Social Media Platform is a full-stack social networking web application developed as part of the CodeAlpha Full Stack Development Internship. It enables users to create accounts, share posts, interact with others through likes and comments, follow users, and manage their profiles using secure JWT authentication.

## Features

- User registration and login with JWT authentication
- Secure password hashing using bcrypt
- Create and delete posts
- Like and unlike posts
- Add and view comments
- Follow and unfollow users
- User profile with followers, following, and personal posts
- Responsive and clean user interface

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- bcrypt

## Installation

```bash
git clone https://github.com/srinithi-07/CodeAlpha_Social_media_platform

cd server

npm install

npm start
```

Create a `.env` file inside the **server** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the frontend using **Live Server** in Visual Studio Code.

## Author

Srinithi G 

GitHub: https://github.com/srinithi-07