
# 📋 Task Management Dashboard

> A modern and responsive task management web app built with **ReactJS** and **Tailwind CSS**. Manage your tasks with filtering, priority selection, and status updates.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Live demo
[👁️ View the project live](https://jose-dashboard.vercel.app/)

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
|-- api/
|   |-- db.json/
|
src/
|-- assets/
|   |-- react.svg
|-- lib/
|   |-- use-app.ts
|
|-- App.jsx
|-- index.jsx
```
---

### Example task object

```json
{
  "id": "uuid",
  "title": "Study React",
  "description": "Finish the hooks module",  
  "state": "false",
  "createdAt": "2026-01-26T13:57:47.926Z"
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
json-server --watch api/db.json --port 3000
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
