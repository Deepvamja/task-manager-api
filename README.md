# Team Task Manager API

A simple REST API for managing team tasks built with **Node.js, Express, and MongoDB**.
This project was developed as part of the Backend Developer Intern screening task.

---

## Features

* User registration and login
* JWT-based authentication
* Password hashing with bcrypt
* Create, update, delete tasks
* View tasks with optional status filtering
* Pagination support
* Only task creators can update or delete tasks

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* JWT Authentication
* bcryptjs

---

## Project Structure

task-manager-api
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   └── taskController.js
│
├── middleware
│   └── authMiddleware.js
│
├── models
│   ├── User.js
│   └── Task.js
│
├── routes
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── server.js
├── package.json
└── README.md

---

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/task-manager-api.git

cd task-manager-api

---

### 2. Install dependencies

npm install

---

### 3. Create environment variables

Create a `.env` file in the root directory.

Example:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

---

### 4. Run the server

npm run dev

Server runs at:

http://localhost:5000

---

## API Endpoints

### Authentication

POST /auth/register
Register a new user.

POST /auth/login
Login and receive a JWT token.

---

### Tasks

All task routes require JWT authentication.

POST /tasks
Create a new task.

GET /tasks
Get all tasks.

Optional filters:

GET /tasks?status=todo
GET /tasks?page=1&limit=5

GET /tasks/:id
Get task by ID.

PUT /tasks/:id
Update a task.

DELETE /tasks/:id
Delete a task.

---

## Example Task Object

{
"title": "Finish backend task",
"description": "Collabzz assignment",
"status": "todo"
}

---

## Security

* Passwords are hashed using bcrypt
* JWT used for authentication
* Only task creators can update/delete tasks

---

## Author

Deep Vamja
