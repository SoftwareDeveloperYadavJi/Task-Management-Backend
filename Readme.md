# Task Management Backend

This is the backend for a task management application, built using Node.js, Express, and MongoDB. It allows users to manage tasks with features like creating, updating, deleting, and retrieving tasks.

## Features
- CRUD operations for tasks.
- User authentication and authorization.
- Task prioritization with priority levels ranging from 1 to 5.
- Support for multiple statuses: `pending` and `finished`.
- MongoDB for database storage.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js installed (v14.x or higher).
- MongoDB installed and running locally or access to a MongoDB Atlas cluster.
- npm (Node Package Manager).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SoftwareDeveloperYadavJi/Task-Management-Backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd task-management-backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskdb
   JWT_SECRET=your_jwt_secret_key
   ```

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. Access the server at `http://localhost:5000`.

## API Endpoints

### Task Endpoints

#### Create a Task
- **URL:** `/api/tasks`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "Task Title",
    "startTime": "2024-12-13T09:00:00Z",
    "endTime": "2024-12-13T12:00:00Z",
    "priority": 3,
    "status": "pending",
    "user": "64f5aefb2b9d4a27a5c3b810"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "64f5affb3b7d4a27a5c3b811",
    "title": "Task Title",
    "startTime": "2024-12-13T09:00:00Z",
    "endTime": "2024-12-13T12:00:00Z",
    "priority": 3,
    "status": "pending",
    "user": "64f5aefb2b9d4a27a5c3b810",
    "__v": 0
  }
  ```

#### Get All Tasks
- **URL:** `/api/tasks`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  ```json
  [
    {
      "_id": "64f5affb3b7d4a27a5c3b811",
      "title": "Task Title",
      "startTime": "2024-12-13T09:00:00Z",
      "endTime": "2024-12-13T12:00:00Z",
      "priority": 3,
      "status": "pending",
      "user": "64f5aefb2b9d4a27a5c3b810",
      "__v": 0
    }
  ]
  ```

#### Update a Task
- **URL:** `/api/tasks/:id`
- **Method:** `PUT`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "status": "finished"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Task updated successfully"
  }
  ```

#### Delete a Task
- **URL:** `/api/tasks/:id`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT**: JSON Web Token for user authentication.


## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a Pull Request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to reach out if you have any questions or suggestions!

