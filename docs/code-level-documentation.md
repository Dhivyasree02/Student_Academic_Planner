
# Code-Level Documentation
## Student Academic Planner

## 1. Introduction

Code-level documentation explains the purpose of the Java classes, interfaces, annotations, and methods used in the Student Academic Planner application.

The application is organized into controller, model, repository, and exception packages.

## 2. Main Application Class

### Main.java

Package: com.studentplanner

Purpose:
- Acts as the entry point of the Spring Boot application.
- Starts the application using SpringApplication.run().
- Enables Spring Boot component scanning from the application package and its subpackages when configured with @SpringBootApplication.

Important annotation:

@SpringBootApplication

This annotation enables Spring Boot configuration, component scanning, and auto-configuration.

## 3. Controller Package

Package: com.studentplanner.controller

Controllers handle incoming HTTP requests and return responses.

### AssignmentController.java

Purpose:
Handles HTTP requests related to academic assignments. Its available operations depend on the mappings and methods defined in the class.

### ExamController.java

Purpose:
Handles requests related to examination information.

### PlannerController.java

Purpose:
Handles requests related to planner information.

### SemesterMarkController.java

Purpose:
Handles semester marks API operations.

Important annotations:

- @RestController: Identifies the class as a REST controller.
- @RequestMapping: Defines a common URL path.
- @PostMapping: Handles HTTP POST requests.
- @GetMapping: Handles HTTP GET requests.
- @DeleteMapping: Handles HTTP DELETE requests.
- @RequestBody: Converts the request body into a Java object.
- @PathVariable: Reads a value from the URL path.

The exact functionality of each controller is determined by its implemented methods.

## 4. Model Package

Package: com.studentplanner.model

Model classes represent application data. Entity classes can be mapped to database tables using JPA annotations.

### AcademicTask.java

Represents academic task information.

### Attendance.java

Represents attendance-related information.

### Exam.java

Represents examination information.

### PlannerItem.java

Represents planner entries.

### SemesterMark.java

Represents a semester marks record.

Fields:
- id: Unique record identifier.
- subject: Subject name.
- semester: Semester name.
- marks: Marks obtained.
- totalMarks: Maximum marks.

Important annotations:

- @Entity: Marks the class as a JPA entity.
- @Table: Specifies the database table name.
- @Id: Identifies the primary key.
- @GeneratedValue: Configures ID generation.

The SemesterMark entity maps to the semester_marks table.

### Student.java

Represents student-related information.

## 5. Repository Package

Package: com.studentplanner.repository

Repositories provide database access operations through Spring Data JPA.

### AcademicTaskRepository.java

Provides database operations for AcademicTask records.

### AttendanceRepository.java

Provides database operations for Attendance records.

### ExamRepository.java

Provides database operations for Exam records.

### PlannerRepository.java

Provides database operations for PlannerItem records.

### SemesterMarkRepository.java

Provides database operations for SemesterMark records.

Declaration:

public interface SemesterMarkRepository
extends JpaRepository<SemesterMark, Long> {
}

JpaRepository provides commonly used operations such as:

- save(): Saves or updates a record.
- findAll(): Retrieves all records.
- findById(): Retrieves a record by its ID.
- deleteById(): Deletes a record by its ID.

### StudentRepository.java

Provides database operations for Student records.

## 6. Exception Package

Package: com.studentplanner.exception

### GlobalExceptionHandler.java

Purpose:
Provides centralized exception-handling logic for exceptions covered by its implemented handler methods.

Important annotation commonly used:

@RestControllerAdvice

This annotation allows exception-handling methods to handle errors raised by REST controllers.

### TaskNotFoundException.java

Purpose:
Represents an exception for cases where a requested task cannot be found, if this exception is used by the application.

## 7. Database Interaction

The general database interaction flow is:

Controller → Repository → JPA/Hibernate → MySQL

A controller receives the request, the repository performs the required data operation, and the persistence framework communicates with MySQL.

## 8. Frontend

### marks.html

Location: src/main/resources/static/marks.html

Purpose:
Provides the semester marks page when the HTML file is served as a static resource.

HTML defines the page structure, CSS styles the interface, and JavaScript handles form submission and requests to the marks API when those functions are implemented in the page.

## 9. Configuration and Build Files

### application.properties

Contains application configuration, such as database connection settings and JPA options.

### pom.xml

Defines Maven project dependencies, build configuration, and project metadata.

## 10. Conclusion

The code structure separates HTTP request handling, data representation, database operations, and exception handling. This modular design improves readability, maintenance, and future development.
