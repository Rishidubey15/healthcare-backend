
# Healthcare Backend API 🏥

A robust RESTful API for a healthcare application built with Node.js, Express, and PostgreSQL. This backend system provides secure user registration, authentication using JWT, and complete CRUD functionality for managing patient and doctor records.

-----

## ✨ Features

  * **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
  * **Patient Management**: Authenticated users can create, retrieve, update, and delete their own patient records.
  * **Doctor Management**: Authenticated users can add and manage doctor information.
  * **Patient-Doctor Mapping**: Assign doctors to specific patients and manage these relationships.
  * **Secure & Scalable**: Built with best practices, including environment variable management and a structured project layout.
  * **Validation**: Input validation on API routes to ensure data integrity.

-----

## 🛠️ Tech Stack

  * **Backend**: Node.js, Express.js
  * **Database**: PostgreSQL
  * **ORM**: Sequelize
  * **Authentication**: JSON Web Tokens (`jsonwebtoken`, `bcryptjs`)
  * **Validation**: `express-validator`

-----

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:

  * [Node.js](https://nodejs.org/) (v16 or higher recommended)
  * [PostgreSQL](https://www.postgresql.org/download/)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Rishidubey15/healthcare-backend.git
    cd healthcare-backend
    ```

2.  **Install NPM packages:**

    ```bash
    npm install
    ```

3.  **Set up the database:**

      * Log in to PostgreSQL.
      * Create a new database for the project.
        ```sql
        CREATE DATABASE healthcare_db;
        ```

4.  **Create an environment variables file:**

      * Create a new file named `.env` in the root of the project.
      * Copy and paste the following content into it, replacing the values with your PostgreSQL credentials.

    <!-- end list -->

    ```env
    # Server Configuration
    PORT=5000

    # Database Configuration
    DB_USER=your_postgres_user
    DB_PASSWORD=your_postgres_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=healthcare_db

    # JWT Configuration
    JWT_SECRET=your_super_secret_key_for_jwt
    JWT_EXPIPIRES_IN=1h
    ```

### Running the Application

To run the server in development mode with auto-reloading:

```bash
npm run dev
```

The server will start on `http://localhost:5000` or the port you specified in your `.env` file.

-----

## API Endpoints

All endpoints are prefixed with `/api`. An `(Auth)` tag indicates that a valid JWT Bearer Token is required in the `Authorization` header.

### 🔑 Authentication (`/auth`)

| Method | Endpoint         | Description                   |
| :----- | :--------------- | :---------------------------- |
| `POST` | `/register`      | Register a new user.          |
| `POST` | `/login`         | Log in a user and get a token.|

**Example `POST /register` Body:**

```json
{
  "name": "Rishi Dubey",
  "email": "rishi@example.com",
  "password": "password123"
}
```

### 👨‍⚕️ Patient Management (`/patients`)

| Method   | Endpoint    | Description                              | Auth   |
|:---------|:------------|:-----------------------------------------|:-------|
| `POST`   | `/`         | Add a new patient.                       | `Yes`  |
| `GET`    | `/`         | Get all patients for the logged-in user. | `Yes`  |
| `GET`    | `/:id`      | Get details of a specific patient.       | `Yes`  |
| `PUT`    | `/:id`      | Update a patient's details.              | `Yes`  |
| `DELETE` | `/:id`      | Delete a patient record.                 | `Yes`  |

**Example `POST /patients` Body:**

```json
{
  "name": "Jane Smith",
  "age": 45,
  "gender": "Female",
  "address": "123 Health St, Wellness City",
  "phone": "555-123-4567"
}
```

### 🩺 Doctor Management (`/doctors`)

| Method   | Endpoint    | Description                    | Auth   |
|:---------|:------------|:-------------------------------|:-------|
| `POST`   | `/`         | Add a new doctor.              | `Yes`  |
| `GET`    | `/`         | Get a list of all doctors.     | `No`   |
| `GET`    | `/:id`      | Get details of a single doctor.| `No`   |
| `PUT`    | `/:id`      | Update a doctor's details.     | `Yes`  |
| `DELETE` | `/:id`      | Delete a doctor record.        | `Yes`  |

**Example `POST /doctors` Body:**

```json
{
  "name": "Dr. Emily Carter",
  "specialization": "Cardiology",
  "contact": "555-0101"
}
```

### 🔗 Patient-Doctor Mappings (`/mappings`)

| Method   | Endpoint         | Description                               | Auth   |
|:---------|:-----------------|:------------------------------------------|:-------|
| `POST`   | `/`              | Assign a doctor to one of your patients.  | `Yes`  |
| `GET`    | `/:patient_id`   | Get all doctors for a specific patient.   | `Yes`  |
| `DELETE` | `/:id`           | Remove a doctor from a patient (`id` is the mapping ID). | `Yes`  |

**Example `POST /mappings` Body:**

```json
{
  "patientId": 1,
  "doctorId": 2
}
```
