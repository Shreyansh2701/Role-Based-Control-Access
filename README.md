# Role-Based Access Control (RBAC) System

A Role-Based Access Control (RBAC) system implemented using the **MERN Stack** (MongoDB, Express, React, Node.js). This project provides a secure and scalable way to manage user roles and permissions.

---

## Features

- **Permission Management**: Assign specific permissions to roles.
- **User Management**: Assign roles to users manually.
- **Authentication**: Secure user authentication using JWT.
- **Authorization**: Restrict access to resources based on roles and permissions.
- **REST API**: Fully functional backend API for managing roles, permissions, and users.

---

## Tech Stack

### Frontend
- **React.js** with Context API/Redux for state management
- **React Router** for navigation
- **Axios** for HTTP requests

### Backend
- **Node.js** with Express.js
- **MongoDB** as the database
- **Mongoose** for MongoDB object modeling
- **JSON Web Tokens (JWT)** for authentication

---

## Installation

### Prerequisites
- Node.js
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Shreyansh2701/Role-Based-Control-Access.git

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
    
4. Set up environment variables:
   Create a ```.env``` file in the backend directory with the following:
   ```bash
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   PORT=5000
   
5. Start the development server:
   * Backend:
      ```bash
      cd server
      npm run dev
   * Frontend:
     ```bash
     cd client
     npm run dev
