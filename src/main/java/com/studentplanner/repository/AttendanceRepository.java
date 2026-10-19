
package com.studentplanner.repository;

import com.studentplanner.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {
}
