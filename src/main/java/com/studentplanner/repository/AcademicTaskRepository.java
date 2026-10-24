package com.studentplanner.repository;

import com.studentplanner.model.AcademicTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcademicTaskRepository
        extends JpaRepository<AcademicTask, Long> {
}