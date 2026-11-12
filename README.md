# Task Tracker

A full-stack task management app built with React, Node.js, Express and MongoDB.

## Features

- Add, edit and delete tasks
- Mark tasks as complete / pending
- Filter by status (All, Pending, Completed)
- Task priority (low, medium, high)
- Responsive layout (single column on mobile, two columns on desktop)

## Tech stack

- **Frontend:** React 18, plain CSS
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB

## Project structure

```
task-tracker/
├── backend/
│   ├── config/db.js                  # MongoDB connection
│   ├── controllers/task-controller.js
│   ├── middleware/error-handler.js
│   ├── models/Task.js
│   ├── routes/task-routes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/index.html
    └── src/
        ├── assets/styles/main.css
        ├── components/               # TaskForm, TaskItem, TaskList, FilterBar
        ├── pages/Home.js
        ├── services/task-service.js  # API calls
        ├── utils/                    # constants, date formatting
        ├── App.js
        └── index.js
```

## Getting started

You need Node.js 18+ and a running MongoDB (local, or a free MongoDB Atlas cluster).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env     # then edit MONGO_URI if needed
npm run dev
```

The API runs on http://localhost:5000.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

The app opens on http://localhost:3000.

## API endpoints

| Method | Endpoint                   | Description                              |
| ------ | -------------------------- | ---------------------------------------- |
| GET    | `/api/tasks?status=...`    | List tasks (`all`, `pending`, `completed`) |
| POST   | `/api/tasks`               | Create a task                            |
| PUT    | `/api/tasks/:id`           | Edit title, description or priority      |
| PATCH  | `/api/tasks/:id/toggle`    | Mark complete / pending                  |
| DELETE | `/api/tasks/:id`           | Delete a task                            |

Example request body for `POST /api/tasks`:

```json
{
  "title": "Finish the assignment",
  "description": "Push it to GitHub",
  "priority": "high"
}
```
