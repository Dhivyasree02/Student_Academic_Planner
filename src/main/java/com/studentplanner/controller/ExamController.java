package com.studentplanner.controller;

import com.studentplanner.model.Exam;
import com.studentplanner.repository.ExamRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamRepository repository;

    public ExamController(ExamRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Exam exam) {

        if (exam.getSubject() == null || exam.getSubject().isBlank()
                || exam.getExamType() == null || exam.getExamType().isBlank()
                || exam.getExamDate() == null) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", "Enter all exam details")
            );
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(repository.save(exam));
    }

    @GetMapping
    public List<Exam> all() {
        return repository.findAll();
    }
}