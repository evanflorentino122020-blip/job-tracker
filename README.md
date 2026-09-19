# Job Tracker

A full-stack job application tracker built with FastAPI, PostgreSQL, SQLAlchemy, Next.js, Docker, and GitHub Actions.

## Features

* User registration and login
* JWT-based authentication
* Create, view, update, and delete job applications
* User-specific application data
* Application status tracking
* Search and filter applications
* PostgreSQL database
* SQLAlchemy ORM
* Alembic database migrations
* Automated tests with pytest
* Dockerized frontend, backend, and database
* GitHub Actions CI

## Tech Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Alembic
* Pydantic
* JWT authentication
* bcrypt

### Frontend

* Next.js
* React
* TypeScript

### Development & Deployment

* Docker
* Docker Compose
* Git
* GitHub Actions
* pytest

## Architecture

The application consists of three main services:

```text
Next.js Frontend
       |
       | HTTP / REST API
       ↓
FastAPI Backend
       |
       | SQLAlchemy
       ↓
PostgreSQL Database
```

Docker Compose runs the frontend, backend, and database as separate containers.

The backend handles authentication, application management, validation, and database operations. The frontend communicates with the backend through the REST API.

## Running Locally

### Prerequisites

* Docker Desktop
* Git

### Start the Application

Clone the repository and enter the project:

```bash
git clone https://github.com/evanflorentino122020-blip/job-tracker
cd job-tracker
```

Start the full application:

```bash
docker compose up -d --build
```

The application will be available at:

* Frontend: http://localhost:3000
* Backend API: http://localhost:8001
* API documentation: http://localhost:8001/docs

### Stop the Application

```bash
docker compose down
```

## Database Migrations

The project uses Alembic to manage database schema changes.

To run migrations inside the backend container:

```bash
docker compose exec backend alembic upgrade head
```

## Testing

The backend uses pytest for automated testing.

Tests can be run locally with:

```bash
pytest
```

The project also uses a separate PostgreSQL database for tests.

## Continuous Integration

GitHub Actions automatically runs the test suite when changes are pushed to the `main` branch or when a pull request is opened.

The CI pipeline:

1. Checks out the repository
2. Sets up Python
3. Installs project dependencies
4. Starts a PostgreSQL test database
5. Runs the pytest test suite

A successful CI run verifies that the backend tests pass in a clean environment.

## API

The backend provides REST API endpoints for authentication and job application management.

Interactive API documentation is available through FastAPI:

```text
http://localhost:8001/docs
```

### Authentication

* `POST /register` — Create a new account
* `POST /login` — Log in and receive a JWT
* `GET /me` — Get the currently authenticated user

### Applications

* `GET /applications` — Get the current user's applications
* `POST /applications` — Create an application
* `PUT /applications/{id}` — Update an application
* `DELETE /applications/{id}` — Delete an application

Authentication is handled using JWT bearer tokens, and users can only access their own applications.

## Project Structure

```text
job-tracker/
├── app/
│   ├── routes/
│   │   ├── applications.py
│   │   └── auth.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── security.py
│
├── alembic/
│   └── versions/
│
├── frontend/
│   ├── app/
│   └── components/
│
├── tests/
│   ├── conftest.py
│   └── test_auth.py
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

## What I Learned

This project provided hands-on experience with:

* Building REST APIs with FastAPI
* Designing database models with SQLAlchemy
* Working with PostgreSQL
* Managing database schema changes with Alembic
* Implementing JWT authentication
* Password hashing with bcrypt
* Request validation with Pydantic
* Writing automated tests with pytest
* Building a frontend with Next.js and TypeScript
* Connecting a frontend to a backend API
* Containerizing applications with Docker
* Running multi-container applications with Docker Compose
* Configuring environment variables and secrets
* Setting up continuous integration with GitHub Actions
* Debugging issues across the frontend, backend, database, and Docker environments
