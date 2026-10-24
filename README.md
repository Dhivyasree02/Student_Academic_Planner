
# Student Academic Planner

## Overview

Student Academic Planner is a Java Spring Boot application designed to help students organize academic tasks and maintain academic information, including semester marks.

The application uses MySQL to store academic records and REST APIs to handle communication between the frontend and backend.

## Features

- Academic task management
- Semester marks entry
- Store and retrieve academic records
- REST API-based communication
- MySQL database integration

## Technologies Used

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL
- HTML
- CSS
- JavaScript
- Maven
- Postman for API testing

## Project Structure

```text
student-planner/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── studentplanner/
│       │           ├── Main.java
│       │           ├── model/
│       │           ├── repository/
│       │           └── controller/
│       └── resources/
│           ├── application.properties
│           └── static/
│               └── marks.html
├── pom.xml
└── README.md
```

Note: The structure above shows the main components.
Other files and packages may exist in the project.

## Requirements

- Java Development Kit (JDK)
- Maven
- MySQL Server
- An IDE such as IntelliJ IDEA or Visual Studio Code
- A web browser
- Postman (optional, for API testing)

## Database Configuration

Create a MySQL database:

```sql
CREATE DATABASE student_planner;
```

Configure the database connection in
`src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_planner
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Replace `YOUR_MYSQL_PASSWORD` with your MySQL password.
Keep the database settings already used by your project if they
are configured differently.

## How to Run

1. Start the MySQL server.
2. Open the project in your IDE.
3. Check the database settings in `application.properties`.
4. Run the Spring Boot main application class.
5. Wait until the application starts successfully.
6. Open the application in your browser.

For the semester marks page, open:

http://localhost:8080/marks.html

## Semester Marks API

Base URL:

`http://localhost:8080/api/marks`

### Save Marks

- Method: POST
- Endpoint: `/api/marks`
- Content-Type: `application/json`

Example request:

```json
{
  "subject": "Java",
  "semester": "Semester 1",
  "marks": 85,
  "totalMarks": 100
}
```

### Retrieve Marks

- Method: GET
- Endpoint: `/api/marks`

This endpoint retrieves the saved semester marks records.

### Delete Marks

- Method: DELETE
- Endpoint: `/api/marks/{id}`

This endpoint deletes a marks record using its ID, provided the
corresponding controller method is implemented.

## Testing

The REST API endpoints can be tested using Postman.

Verify that:
- The application starts successfully.
- The database connection works.
- Marks can be submitted successfully.
- Saved records can be retrieved.
- The frontend displays the saved records.

## Future Enhancements

- User authentication
- Academic deadline reminders
- Attendance management
- Grade and progress reports
- Calendar integration

## Conclusion

Student Academic Planner demonstrates the use of Java, Spring Boot,
REST APIs, Spring Data JPA, and MySQL to manage academic information.
The project can be extended with additional features to support
students in planning and tracking their academic activities.
