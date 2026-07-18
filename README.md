# DevPulse
DevPulse is a RESTful backend application for tracking software bugs and feature requests. It allows users to register, log in, create and manage issues based on their roles. The project is built with Node.js, Express.js, TypeScript, PostgreSQL, and JWT authentication

## Live URL
https://devpulse-assignment-2-olive.vercel.app

## Features
- User Registration
- User Login
- JWT Authentication
- Create Issue
- Get All Issues
- Get Single Issue
- Update Issue
- Update Issue Status
- Delete Issue
- Role-based authorization

## Tech Stack
- Node.js
- TypeScript 
- Express.js
- PostgreSQL
- pg
- bcrypt
- jsonwebtoken(JWT)
- dotenv
- cors

## Setup
### 1. Clone the repository

```bash
git clone https://github.com/sumaiyakhondoker/devpulse.git
cd devpulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the project root and add the required environment variables.

### 4. Start the development server

```bash
npm run dev
```

## API endpoint list

| Method | Endpoint | Access | Description | 
|--------|----------|--------|-------------|
| POST | /api/auth/signup | Public | Register a new user |
| POST | /api/auth/login | Public | Login user and get JWT token |
| POST | /api/issues | Contributor, Maintainer | Create a new issue |
| GET | /api/issues | Public | Get all issues |
| GET | /api/issues/:id | Public | Get a single issue |
| PATCH | /api/issues/:id | Contributor, Maintainer | Update an issue |
| PATCH | /api/issues/status/:id | Maintainer | Update issue status |
| DELETE | /api/issues/:id | Maintainer | Delete an issue |

## Database schema summary
### Users Table

| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR | User fullname |
| email | VARCHAR | Unique email address |
| password | TEXT | Hashed password |
| role | VARCHAR | Contributor or Maintainer |
| created_at | TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | Last update time |
 
### Issues Table

| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL | Primary key |
| title | VARCHAR(150) | Issue title |
| description | TEXT | Description of issue |
| type | VARCHAR | bug or feature_request |
| status | VARCHAR | open, in_progress, resolved |
| reporter_id | INTEGER | ID of issue creator |
| created_at | TIMESTAMP | Issue creation time |
| updated_at | TIMESTAMP | Last update time |
 
