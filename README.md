# Job Portal

This is a full-stack job portal web application that connects job seekers with companies. It features a user-friendly interface for browsing and filtering job opportunities, user authentication, and a dynamic frontend that interacts with a backend API.

## Features

*   **User Authentication:** Secure user registration and login system with password hashing.
*   **Job Listings:** Browse a comprehensive list of job opportunities from various companies.
*   **Company Profiles:** View a list of top companies and the jobs they offer.
*   **Advanced Job Filtering:** Filter jobs by work flexibility, location, role, company, salary, and more.
*   **Dynamic UI:** The frontend is built with vanilla JavaScript and dynamically renders job and company data from the backend.
*   **RESTful API:** A backend API built with Node.js and Express to serve data to the frontend.

## Technologies Used

### Frontend
*   HTML5
*   CSS3
*   Vanilla JavaScript

### Backend
*   Node.js
*   Express.js
*   MySQL2
*   bcrypt
*   express-session
*   dotenv

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your machine:
*   [Node.js](https://nodejs.org/) (which includes npm)
*   [MySQL](https://www.mysql.com/downloads/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/job-portal.git
    cd job-portal
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a `.env` file in the root of the project and add your database and session configuration:
    ```
    DB_HOST=localhost
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=job_portal
    SESSION_SECRET=your_session_secret
    PORT=5000
    ```

4.  **Set up the MySQL database:**
    Connect to your MySQL server and run the following queries to create the database and tables:

    ```sql
    CREATE DATABASE job_portal;
    USE job_portal;

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE companies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        location VARCHAR(255),
        industry VARCHAR(255),
        job_description TEXT,
        stipend VARCHAR(255),
        work_hours VARCHAR(255),
        reallocation_bonus VARCHAR(255),
        contact_number VARCHAR(255),
        flexibility VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        location VARCHAR(255),
        industry VARCHAR(255),
        job_description TEXT,
        stipend VARCHAR(255),
        work_hours VARCHAR(255),
        reallocation_bonus VARCHAR(255),
        contact_number VARCHAR(255),
        flexibility VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

5.  **Populate the database with sample data:**
    Run the `add_jobs.js` script to insert sample job data into the `companies` table.
    ```bash
    node add_jobs.js
    ```

6.  **Start the server:**
    ```bash
    node server.js
    ```
    The application should now be running at `http://localhost:5000`.

## API Endpoints

The backend server provides the following API endpoints:

*   `GET /`: Serves the main `index.html` file.
*   `GET /api/companies`: Returns a list of all companies.
*   `GET /api/jobs`: Returns a list of all jobs.
*   `GET /api/all-data`: Returns a combined list of all companies and jobs.
*   `POST /api/register`: Registers a new user.
*   `POST /api/login`: Logs in a user and creates a session.
*   `POST /api/logout`: Logs out the current user.
*   `GET /api/me`: Checks the current login status.
*   `POST /api/apply-job`: (Protected) An example of a route that requires authentication.
