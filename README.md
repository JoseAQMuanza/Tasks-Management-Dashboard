
# 📋 Task Management Dashboard

> A modern and responsive task management web app built with **ReactJS** and **Tailwind CSS**. Manage your tasks with filtering, priority selection, and status updates.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Demo ao vivo  
[👁️ Veja o projeto no ar](https://jose-dashboard.vercel.app/)

---

## 🔍 Overview

This is a task management system (Todo List) built with **ReactJS** and **Tailwind CSS**, focused on CRUD operations with a responsive and intuitive interface. The goal is to allow users to create, edit, filter, and delete tasks with different priorities.

---

## 🛠️ Technologies Used

- **ReactJS**
- **React Router DOM**
- **Tailwind CSS**
- **uuid** (for ID generation)
- **JSON Server** (to simulate a local backend)

---

## 📁 Folder Structure

```
src/
|-- components/
|   |-- form/
|   |   |-- input.jsx
|   |   |-- select.jsx
|   |   |-- text_area.jsx
|   |   |-- button.jsx
|   \-- form.jsx
|   \-- todo_item.jsx
|
|-- pages/
|   |-- dashboard.jsx
|   |-- new_user.jsx
|   \-- edit.jsx
|
|-- App.jsx
|-- index.jsx
```

---

## 🚀 Main Features

### 1. **Dashboard** (`/`)
- Displays task list with status filter (all, completed, not completed)
- Allows deletion, editing, and marking tasks as complete

### 2. **Create New Task** (`/new_user`)
- Form with fields: Title, Description, and Priority
- Dynamic priority list from `GET /Priority`
- Submits via `POST /Tasks`

### 3. **Edit Task** (`/edit/:id`)
- Fetches task by ID
- Updates via `PATCH /Tasks/:id`

---

## 🧩 Reusable Components

- `Input`: Generic text input
- `TextArea`: Multiline input for task descriptions
- `Select`: Dropdown for priority
- `Button`: Styled interactive button
- `TodoItem`: Renders individual task rows

---

## 📡 API Simulation (JSON Server)

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/Tasks`         | Fetch all tasks           |
| GET    | `/Tasks/:id`     | Get a task by ID          |
| POST   | `/Tasks`         | Add a new task            |
| PATCH  | `/Tasks/:id`     | Update an existing task   |
| DELETE | `/Tasks/:id`     | Delete a task             |
| GET    | `/Priority`      | Fetch available priorities|

### Example task object

```json
{
  "id": "uuid",
  "title": "Study React",
  "description": "Finish the hooks module",
  "priority": "High",
  "state": "false"
}
```

---

## ⚙️ Local Setup

1. Clone the repository  
2. Install dependencies:

```bash
npm install
```

3. Start JSON Server:

```bash
json-server --watch db.json --port 3000
```

4. Run the React App:

```bash
npm run dev
```

---

## 📌 Final Notes

- Fully responsive interface with Tailwind CSS
- Backend simulated with JSON Server
- Easily adaptable for real API integration
- Perfect for portfolio or practice projects

---

## 👨‍💻 Author

**José Muanza**  
[🌐 Portfolio](https://jose-dashboard.vercel.app) | [💻 GitHub](https://github.com/JoseAQMuanza)
