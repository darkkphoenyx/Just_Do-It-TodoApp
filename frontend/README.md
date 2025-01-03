# Just Do It - Frontend

The frontend for [**Just Do It!**]() is a responsive and user-friendly interface for managing tasks efficiently. Built with React, it supports authentication, personalized to-dos, and seamless navigation.

---

## Features

- **Authentication:** Login functionality to secure user data.
- **Task Management:** Create, view, and manage tasks directly from the UI.
- **Routing:** Smooth navigation between pages using React Router.
- **Responsive Design:** Optimized for desktop devices.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/darkkphoenyx/task1_Todo_final.git
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Folder Structure

```plaintext
src/
├── components/        # Reusable UI components
├── pages/             # Pages for routing (Login, HomePage)
│   ├── Login/         # Login page
│   └── Homepage/      # Homepage
├── AppRoutes/         # Route definitions
├── App.tsx            # Main application component
└── index.css          # Entry point
```

---

## Routes

| Path        | Component  | Description                                          |
| ----------- | ---------- | ---------------------------------------------------- |
| `/`         | `Login`    | Login page for user auth                             |
| `/homepage` | `HomePage` | Main dashboard/homepage (Protected via AccessTokens) |

---

## Technologies Used

- **Framework:** React.js
- **Routing:** React Router
- **Styling:** Tailwind

---

## How It Works

1. **Authentication Flow:**

   - Users start at the login page (`/`).
   - Once authenticated, they are redirected to the homepage (`/homepage`).

2. **Task Management:**
   - Features for task creation and management are accessible on the homepage.

---

## Contributing

Feel free to [fork](https://github.com/login?return_to=%2Fdarkkphoenyx%2Ftask1_Todo_final) this repository, create a new branch, and submit a pull request with your changes.

- Check the [CONTRUBUTING.md](https://github.com/darkkphoenyx/task1_Todo_final/blob/master/CONTRIBUTING.md) file for more details.

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by [**Deepesh**](https://www.linkedin.com/in/deepeshsunuwar/).
