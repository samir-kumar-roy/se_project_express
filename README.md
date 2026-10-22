# WTWR (What To Wear?)

A full-stack weather-based wardrobe app that helps users decide what to wear based on current weather conditions.
User can create a profile, add a garment, like / unlike it even delete its own.

## Live project
- https://www.wtwrbysamir.jumpingcrab.com

## This repository includes:
- A React frontend (`se_project_react`) for UI, auth flows, weather display, and clothing cards
### Frontend Repo
- https://github.com/samir-kumar-roy/se_project_react


- An Express/MongoDB backend (`se_project_express`) for users, items, likes, and protected routes
### Backend Repo
- https://github.com/samir-kumar-roy/se_project_express

## Project Pitch Video

Watch the project pitch here:
- [WTWR Project Pitch](https://drive.google.com/file/d/1-D-UCxz3PVsNs_i4xaV-STPNbO1mXWY2/view?usp=drive_link)

## Tech Stack

### Frontend
- React
- React Router
- Vite
- CSS

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication

## Repository Structure

```text
wtwr/
├── README.md
├── screenshots/
├── se_project_express/
└── se_project_react/
```

## Getting Started

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd wtwr
```

### 2) Install dependencies

Backend:

```bash
cd se_project_express
npm install
```

Frontend:

```bash
cd ../se_project_react
npm install
```

### 3) Run the backend

From `se_project_express`:

```bash
npm run dev
```

Default backend API URL used by frontend: `http://localhost:3001`

### 4) Run the frontend

From `se_project_react`:

```bash
npm run dev
```

Note: if port `3001` is already used by backend, run frontend on a different port:

```bash
npm run dev -- --port 3002
```

## Feature Highlights

- Weather card with dynamic visuals based on conditions/daytime
- Auth flows (sign up/sign in/sign out)
- Profile page with edit profile support
- Add, preview, like/unlike, and delete clothing items
- Protected API routes with token-based authorization

## API Overview (Backend)

Typical endpoints include:
- `POST /signup`
- `POST /signin`
- `GET /users/me`
- `PATCH /users/me`
- `GET /items`
- `POST /items`
- `DELETE /items/:itemId`
- `PUT /items/:itemId/likes`
- `DELETE /items/:itemId/likes`

## Screenshots

All screenshots from the `screenshots` folder:

### 1. WTWR Screenshot 1
![WTWR Screenshot 1](screenshots/wtwr-ss-1.png)

### 2. WTWR Screenshot 2
![WTWR Screenshot 2](screenshots/wtwr-ss-2.png)

### 3. WTWR Screenshot 3
![WTWR Screenshot 3](screenshots/wtwr-ss-3.png)

### 4. WTWR Screenshot 4
![WTWR Screenshot 4](screenshots/wtwr-ss-4.png)

### 5. WTWR Screenshot 5
![WTWR Screenshot 5](screenshots/wtwr-ss-5.png)

### 6. WTWR Screenshot 6
![WTWR Screenshot 6](screenshots/wtwr-ss-6.png)

### 7. WTWR Screenshot 7
![WTWR Screenshot 7](screenshots/wtwr-ss-7.png)

## Author

Samir Roy

- GitHub: [samir-kumar-roy](https://github.com/samir-kumar-roy)
- LinkedIn: [samir-kumar-roy](https://linkedin.com/in/samir-kumar-roy)
- Email: samirroy.8990@gmail.com
         samirroy.594@gmail.com
