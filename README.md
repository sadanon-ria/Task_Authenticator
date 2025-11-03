# 🧠 Task Authenticator

A simple authentication system built with **Node.js**, **Express**, and **PostgreSQL**.  

---

## 🚀 Getting Started

### 1️⃣ Clone this repository
```bash
git clone https://github.com/sadanon-ria/Task_Authenticator.git
cd Task_Authenticator
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup environment variables
Create a new file named .env in the project root and add the following configuration:
# Database settings
USER = "postgres"
HOST = "localhost"
DATABASE = "task_login"
PASSWORD = "123"

# Server settings
PORT = "5000"

# JWT Secret key
JWT_SECRET = "jwt_secret_key"

### 4️⃣ Run the server
```bash
npm run dev
```

The server will start at:
🌐 http://localhost:5000 

💬 Example API Endpoints
| Method   | Endpoint                            | Description                    |
| :------- | :---------------------------------- | :----------------------------- |
| **POST** | `/auth/register`                    | Register new user              |
| **POST** | `/auth/login`                       | User login                     |
| **GET**  | `/information/getUser/:id`          | Get user information by ID     |
| **GET**  | `/information/getUser`              | Get All user information       |




