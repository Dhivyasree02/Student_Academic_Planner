package com.studentplanner.controller;

import com.studentplanner.model.AcademicTask;
import com.studentplanner.repository.AcademicTaskRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin
public class AssignmentController {

    private final AcademicTaskRepository repository;

    public AssignmentController(AcademicTaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<AcademicTask> getAllAssignments() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AcademicTask addAssignment(@RequestBody AcademicTask task) {
        task.setCompleted(false);
        return repository.save(task);
    }

    @PutMapping("/{id}/complete")
    public AcademicTask completeAssignment(@PathVariable Long id) {
        AcademicTask task = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Assignment not found: " + id));

        task.setCompleted(true);
        return repository.save(task);
    }
}