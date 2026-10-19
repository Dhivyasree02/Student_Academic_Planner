
package com.studentplanner.controller;

import com.studentplanner.model.Student;
import com.studentplanner.repository.StudentRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PlannerController {

    private final StudentRepository students;

    public PlannerController(StudentRepository students) {
        this.students = students;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Student student) {

        if (student.getName() == null
                || student.getName().isBlank()
                || student.getEmail() == null
                || student.getEmail().isBlank()
                || student.getPassword() == null
                || student.getPassword().isBlank()) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", "Please fill all fields")
            );
        }

        if (students.existsByEmail(student.getEmail())) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Email already registered")
            );
        }

        students.save(student);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                Map.of("message", "Registration successful")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Student student) {

        if (student.getEmail() == null
                || student.getPassword() == null) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", "Enter email and password")
            );
        }

        var found = students.findByEmail(student.getEmail());

        if (found.isPresent()
                && found.get().getPassword()
                .equals(student.getPassword())) {

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Login successful",
                            "email", found.get().getEmail(),
                            "name", found.get().getName()
                    )
            );
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                Map.of("message", "Invalid email or password")
        );
    }
}
