# LoginPage
This repository contains a login page application built with Express.js, MySQL, and EJS. The application includes user registration and login functionalities.

# Requirements
Node.js
MySQL

# Installation
Clone the repository:

git clone https://github.com/Asjdnnc/LoginPage.git
cd LoginPage
Install the dependencies:

npm install
Set up MySQL:

Create a new MySQL database named login.
Update the MySQL connection details in index.js (host, user, password, database).

# Initialize the database:

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

# Usage
Start the server:
node index.js
Open your browser and go to http://localhost:3000/register to access the registration page.
Register a new user and then go to http://localhost:3000/login to access the login page.

