# 🔐 Simple Auth Mini App

This is a **simple authentication app for educational purposes**, designed to help you understand the core logic of authentication using Angular with NgRx on the frontend and ASP.NET Core (.NET 8) on the backend. It demonstrates clean login, registration, JWT-based authentication, and user management.

---

## ⚙️ Tech Stack

* **Frontend:** Angular 18+ with NgRx and Angular Material
* **Backend:** ASP.NET Core Web API (.NET 8)
* **Database:** MongoDB
* **Authentication:** JWT tokens with BCrypt password hashing

---

## 🧩 Features

* User Registration & Login
* JWT Token Authentication
* Get Current Authenticated User
* Public User Listing
* Responsive UI with a clean theme

---

## 📁 Project Structure

```
auth-mini-app/
├── auth-app.Client      # Angular frontend
└── auth-app.Api         # ASP.NET Core Web API backend
```

---

## 🔧 Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/auth-mini-app.git
cd auth-mini-app
```

### 2. Backend Setup (.NET 8)

```bash
cd auth-app.Api
```

* Update `appsettings.json` with your JWT secret and MongoDB connection:

```json
{
  "JwtConfig": {
    "SecretKey": "your-super-secret-key",
    "Issuer": "AuthApi",
    "Audience": "AuthClient",
    "ExpirationMinutes": 60
  },
  "ConnectionStrings": {
    "MongoDb": "mongodb://localhost:27017/authdb"
  }
}
```

* Run the backend API:

```bash
dotnet restore
dotnet run
```

API will be available at: `https://localhost:5001`

---

### 3. Frontend Setup (Angular)

```bash
cd ../auth-app.Client
npm install
```

* Set the backend API URL in `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

* Run the Angular app:

```bash
ng serve --open
```

Frontend will be available at: `http://localhost:4200`

---

## 🗂 API Endpoints

| Method | Route                   | Auth Required | Description             |
| ------ | ----------------------- | ------------- | ----------------------- |
| POST   | `/api/Auth/register`    | No            | Register a new user     |
| POST   | `/api/Auth/login`       | No            | Login and receive JWT   |
| GET    | `/api/Auth/GetUser`     | Yes           | Get current logged user |
| GET    | `/api/User/GetAllUsers` | No            | Get list of all users   |

---

## 🔐 Security Notes

* Passwords are hashed using **BCrypt**
* JWT tokens are signed and validated on backend
* Authorization enforced via `[Authorize]` attributes
* Frontend uses NgRx store for auth state management

---

## 📜 License

MIT License - free to use and extend for your projects.

---

## 👨‍💻 Author

Your Name
GitHub: [@yourusername](https://github.com/yourusername)
Email: [your.email@example.com](mailto:your.email@example.com)

---

*Happy learning and coding!*
