
# Design Documentation
## Student Academic Planner

## 1. Introduction

The Student Academic Planner is a software application developed to help students organize and manage their academic information. It provides a centralized system for handling academic tasks, examinations, attendance information, and semester marks.

The backend is developed using Java and Spring Boot, while MySQL is used to store application data. The system uses a layered architecture to separate request handling, data representation, and database operations.

## 2. Objectives

- To organize academic information in a centralized application.
- To maintain academic task and examination details.
- To store and retrieve semester marks.
- To manage attendance-related information.
- To simplify database operations.
- To provide a foundation for future academic management features.

## 3. System Architecture

The application follows a layered architecture.

### 3.1 Presentation Layer

The frontend uses HTML, CSS, and JavaScript to display information and collect user input.

### 3.2 Controller Layer

Spring Boot controller classes receive HTTP requests and return responses to the client.

Examples:
- AssignmentController
- ExamController
- PlannerController
- SemesterMarkController

### 3.3 Model Layer

Model classes represent the data handled by the application.

Examples:
- AcademicTask
- Exam
- PlannerItem
- SemesterMark
- Attendance
- Student

### 3.4 Repository Layer

Spring Data JPA repository interfaces handle database operations.

Examples:
- AcademicTaskRepository
- ExamRepository
- PlannerRepository
- SemesterMarkRepository
- AttendanceRepository
- StudentRepository

### 3.5 Database Layer

MySQL stores the application records. Spring Data JPA and Hibernate support communication between Java entity classes and database tables.

## 4. Module Design

### 4.1 Academic Task Management

This module manages academic task-related information using the relevant model, controller, and repository components.

### 4.2 Examination Management

This module organizes examination-related information through the examination model and controller.

### 4.3 Academic Planner

This module manages planner-related information using the planner components.

### 4.4 Semester Marks Management

This module allows subject name, semester, marks obtained, and total marks to be stored and retrieved.

### 4.5 Attendance Management

The project contains attendance-related model and repository components for handling attendance data.

### 4.6 Student Management

The project contains student-related model and repository components for handling student information.

Note: The exact operations available in each module depend on the controller methods implemented in the project.

## 5. Database Design

The application uses MySQL as its relational database management system.

The SemesterMark entity contains the following fields:

| Field | Description |
|---|---|
| id | Unique record identifier |
| subject | Subject name |
| semester | Semester information |
| marks | Marks obtained |
| totalMarks | Maximum marks |

The primary key is generated automatically using the JPA identity generation strategy.

Other entity fields and relationships should be documented based on their actual Java model definitions.

## 6. Technologies Used

- Java: Backend programming language.
- Spring Boot: Backend application framework.
- Spring Web: REST API development.
- Spring Data JPA: Database access.
- Hibernate: Object-relational mapping.
- MySQL: Relational database.
- HTML: Web page structure.
- CSS: User interface styling.
- JavaScript: Frontend interactions and HTTP requests.
- Maven: Project dependency and build management.
- Postman: REST API testing.

## 7. Design Workflow

1. The user enters information through the frontend.
2. JavaScript sends an HTTP request to the backend.
3. The appropriate controller receives the request.
4. The controller uses the relevant repository to perform database operations.
5. The repository communicates with the database.
6. The backend returns a response to the client.
7. The frontend displays the result.

## 8. Conclusion

The Student Academic Planner uses a modular architecture to organize academic information. Separating controllers, models, and repositories improves code organization and makes the application easier to maintain and extend.
