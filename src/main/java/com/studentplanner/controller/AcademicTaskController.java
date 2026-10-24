package com.studentplanner.controller;

import com.studentplanner.model.AcademicTask;
import com.studentplanner.repository.AcademicTaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

//@RestController
@RequestMapping("/api/assignments")
public class AcademicTaskController {

    private final AcademicTaskRepository repository;

    public AcademicTaskController(AcademicTaskRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody AcademicTask task) {

        if (task.getTitle() == null || task.getTitle().isBlank()
                || task.getSubject() == null || task.getSubject().isBlank()
                || task.getDueDate() == null) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", "Enter all assignment details")
            );
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(repository.save(task));
    }

    @GetMapping
    public List<AcademicTask> all() {
        return repository.findAll();
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<?> complete(@PathVariable Long id) {

        return repository.findById(id)
                .<ResponseEntity<?>>map(task -> {
                    task.setCompleted(true);
                    return ResponseEntity.ok(repository.save(task));
                })
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(Map.of("message", "Assignment not found"))
                );
    }
}