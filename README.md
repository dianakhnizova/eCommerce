# RSS-ECOMM: E-Commerce Frontend

Welcome to the final **eCommerce application** project — an advanced e-commerce frontend built as part of the [RS School Frontend Course](https://rs.school/js/).  
This application is powered by modern web technologies and integrates with **CommerceTools** for backend operations.

---

## 📌 Project Overview

This is a React-based e-commerce frontend application that communicates with CommerceTools via its API.  
It is a collaborative team project developed in multiple sprints using modern frontend best practices and tools.

---

## 🧰 Tech Stack

- **React** – UI library
- **React Router** – Routing
- **TypeScript** – Type safety
- **Vite** – Fast development bundler
- **Vitest** – Testing framework
- **ESLint** – Linting and code quality
- **Prettier** – Code formatting
- **Husky** – Git hooks
- **MobX** – State management
- **Axios** – HTTP client
- **CommerceTools** – E-commerce backend platform

---

## 📜 Available Scripts

In the project directory, you can run:

| Script     | Command                            | Description                                                               |
| ---------- | ---------------------------------- | ------------------------------------------------------------------------- |
| `dev`      | `vite`                             | Starts the development server with hot reloading.                         |
| `build`    | `tsc -b && vite build`             | Builds the app for production. Compiles TypeScript and bundles with Vite. |
| `preview`  | `vite preview`                     | Locally previews the production build.                                    |
| `lint`     | `eslint .`                         | Lints all files in the project using ESLint.                              |
| `format`   | `prettier --write .`               | Formats code using Prettier.                                              |
| `test`     | `vitest --config vitest.config.ts` | Runs unit tests using Vitest with the specified configuration.            |
| `coverage` | `vitest run --coverage`            | Runs unit tests with coverage reporting using Vitest.                     |

---

## 🚀 Getting Started Locally

Follow the steps below to run the project on your local machine:

### 1. Clone the repository

git clone https://github.com/dianakhnizova/eCommerce.git  
cd eCommerce

### 2. Install dependencies

Make sure you have Node.js (>=18) installed.

npm install

### 3. Set up environment variables

Create a .env file in the root directory and add your CommerceTools credentials:

VITE_CT_PROJECT_KEY=your_project_key  
VITE_CT_CLIENT_ID=your_client_id  
VITE_CT_CLIENT_SECRET=your_client_secret  
VITE_CT_API_URL=https://auth.australia-southeast1.gcp.commercetools.com/oauth/  
VITE_CT_AUTH_URL=https://api.australia-southeast1.gcp.commercetools.com/  
Note: Ask your team or mentor for credentials if you don't have access.

### 4. Start the development server

npm run dev  
This will launch the app at http://localhost:5173.

👥 Contributors

This project is developed by a team of students  
[Diana Khnizova](https://github.com/dianakhnizova),  
[Anastasiia Starkova](https://github.com/Starkoans),  
[Aizhan Bexatova](https://github.com/Ulistonee)  
from the RS School Frontend Course.  
All members have access to the repository and are actively collaborating through issues and pull requests.

🧪 Testing  
Unit tests will be written using Vitest.

📄 License  
This project is developed for educational purposes as part of the RS School course.
