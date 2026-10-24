# Student Academic Planner

## Overview
Student Academic Planner is a Java Spring Boot web application that helps students organize academic tasks and manage their academic information.

The application uses Spring Boot for backend services, HTML, CSS and JavaScript for the frontend, and MySQL for database storage.

## Features
- Academic task management
- Semester marks management
- Attendance management
- Exam schedule management
- Academic information storage using MySQL
- REST API integration

*Note: Features depend on the modules implemented and working in the current project.*

## Technologies Used
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL
- HTML, CSS and JavaScript
- Maven
- Postman for API testing

## Project Structure
```text
StudentAcademicPlanner/
├── docs/
├── src/
│   └── main/
│       ├── java/
│       └── resources/
├── .gitignore
├── pom.xml
└── README.md
```

## Requirements
- JDK 17 or a compatible JDK configured for the project
- MySQL Server
- IntelliJ IDEA or another Java IDE
- Web browser
- Maven (or the Maven wrapper, if included)

## Database Setup
Create the database in MySQL:

```sql
CREATE DATABASE student_planner;
```

Configure the database connection in `src/main/resources/application.properties`.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_planner
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

Set the `DB_PASSWORD` environment variable to your local MySQL password before running the application. Do not upload your real database password to GitHub.

## How to Run
1. Start the MySQL server.
2. Open the project in IntelliJ IDEA.
3. Ensure the `student_planner` database exists.
4. Set the `DB_PASSWORD` environment variable.
5. Run the actual Spring Boot main application class.
6. Once the application starts, open `http://localhost:8080/` in your browser.

Open a specific page such as `/marks.html` only if that page exists in `src/main/resources/static/`.

## API Testing
Use Postman to test the REST API endpoints implemented by the project.

Check that the application starts, the database connection works, and the implemented endpoints can save and retrieve records.

## Future Enhancements
- Improved authentication and authorization
- Academic deadline reminders
- Progress reports
- Calendar integration

## Conclusion
Student Academic Planner demonstrates how Java, Spring Boot, REST APIs, and MySQL can be used to build an academic management application.
