# TaskFlow 🚀

A full-stack task management application built with Spring Boot and React, designed for enterprise team collaboration.

## 🌟 Features

- **JWT Authentication** — Secure login with role-based access (Admin / User)
- **Admin Dashboard** — Manage users, teams, projects and tasks
- **Team Management** — Create teams and assign members
- **Project Management** — Create projects and link them to teams
- **Task Assignment** — Assign tasks to specific team members
- **Task Status** — Track progress with TODO / IN PROGRESS / DONE
- **User Dashboard** — Each user sees only their assigned tasks

## 🛠️ Tech Stack

**Backend**
- Java 17
- Spring Boot 3
- Spring Security + JWT
- Spring Data JPA / Hibernate
- PostgreSQL

**Frontend**
- React 18 + Vite
- Tailwind CSS
- Axios
- React Router DOM

**Tools**
- Git / GitHub
- IntelliJ IDEA
- Postman

## 🏗️ Architecture

```
Frontend (React)
      ↓ Axios + JWT Token
Backend (Spring Boot)
      ↓ JPA
Database (PostgreSQL)
```

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Irafan03/Taskflow.git

# Navigate to backend
cd taskflow

# Configure database in application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskflow
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD

# Run the application
./mvnw spring-boot:run
```

### Frontend Setup

```bash
# Navigate to frontend
cd taskflow/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
