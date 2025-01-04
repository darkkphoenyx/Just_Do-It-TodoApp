# Just Do It - Backend API

This is the backend service for the [**Just Do It!**]() to-do application. It provides APIs for user authentication, task management, and additional features like filtering and searching todos.

---

## Features

- User authentication (login, signup, refresh token, logout)
- CRUD operations for todos
- Toggle task completion status
- Search todos by title or status
- Secure routes with token-based authentication

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/darkkphoenyx/Just_Do-It-TodoApp.git
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   PORT=your_port
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. Run the server:
   ```bash
   npm run start
   ```

---

## API Endpoints

### Authentication Routes

| Method | Endpoint                | Description                  |
| ------ | ----------------------- | ---------------------------- |
| POST   | `/auth/login`           | Log in a user                |
| POST   | `/auth/signup`          | Register a new user          |
| POST   | `/auth/refresh`         | Refresh the user's JWT token |
| POST   | `/auth/logout`          | Log out a user               |
| POST   | `/auth/forgot-password` | Send a forgot password email |

### Todo Routes

| Method | Endpoint           | Description                              |
| ------ | ------------------ | ---------------------------------------- |
| POST   | `/todo/create`     | Create a new todo (requires token)       |
| GET    | `/todo/get/:id`    | Get a specific todo by ID                |
| GET    | `/todo/getAll`     | Get all todos for the authenticated user |
| DELETE | `/todo/delete/:id` | Delete a todo by ID                      |
| PATCH  | `/todo/update/:id` | Update a todo by ID                      |
| PATCH  | `/todo/toggle/:id` | Toggle completion status of a todo       |
| GET    | `/todo/title`      | Search todos by title                    |
| GET    | `/todo/status`     | Search todos by status                   |

---

## Middleware

- **Authentication:** `authenticateToken` - Ensures routes are accessible only to authorized users.
- **Validation:** `validate(schema)` - Validates request payloads against predefined DTOs.

---

## Technologies Used

- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Custom validation with schemas

---

## Contributing

Feel free to [fork](https://github.com/login?return_to=%2Fdarkkphoenyx%2FJust_Do-It-TodoApp) this repository, create a new branch, and submit a pull request with your changes.

- Check the [CONTRUBUTING.md](https://github.com/darkkphoenyx/Just_Do-It-TodoApp/blob/master/CONTRIBUTING.md) file for more details.

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by [**Deepesh**](https://www.linkedin.com/in/deepeshsunuwar/).
