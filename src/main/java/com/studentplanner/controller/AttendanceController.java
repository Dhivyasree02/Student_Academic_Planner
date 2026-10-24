package com.studentplanner.controller;

import com.studentplanner.model.Attendance;
import com.studentplanner.repository.AttendanceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceRepository repository;

    public AttendanceController(AttendanceRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Attendance item) {

        if (item.getSubject() == null || item.getSubject().isBlank()
                || item.getTotalClasses() < 1
                || item.getAttendedClasses() < 0
                || item.getAttendedClasses() > item.getTotalClasses()) {

            return ResponseEntity.badRequest().body(
                    Map.of("message", "Enter valid attendance details")
            );
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(repository.save(item));
    }

    @GetMapping
    public List<Attendance> all() {
        return repository.findAll();
    }
}