package com.studentplanner.controller;

import com.studentplanner.model.SemesterMark;
import com.studentplanner.repository.SemesterMarkRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/marks")
public class SemesterMarkController {

    private final SemesterMarkRepository repository;

    public SemesterMarkController(SemesterMarkRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody SemesterMark item) {

        if (!isValid(item)) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Enter valid semester mark details")
            );
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(repository.save(item));
    }

    @GetMapping
    public List<SemesterMark> all() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> byId(@PathVariable Long id) {

        return repository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(Map.of("message", "Mark not found"))
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody SemesterMark updated) {

        if (!isValid(updated)) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Enter valid semester mark details")
            );
        }

        return repository.findById(id)
                .<ResponseEntity<?>>map(existing -> {
                    existing.setSubject(updated.getSubject());
                    existing.setSemester(updated.getSemester());
                    existing.setMarks(updated.getMarks());
                    existing.setTotalMarks(updated.getTotalMarks());

                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(Map.of("message", "Mark not found"))
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Mark not found"));
        }

        repository.deleteById(id);

        return ResponseEntity.ok(
                Map.of("message", "Mark deleted")
        );
    }

    private boolean isValid(SemesterMark item) {
        return item.getSubject() != null
                && !item.getSubject().isBlank()
                && item.getSemester() != null
                && !item.getSemester().isBlank()
                && item.getTotalMarks() > 0
                && item.getMarks() >= 0
                && item.getMarks() <= item.getTotalMarks();
    }
}