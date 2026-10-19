
package com.studentplanner.repository;

import com.studentplanner.model.SemesterMark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SemesterMarkRepository
        extends JpaRepository<SemesterMark, Long> {
}
