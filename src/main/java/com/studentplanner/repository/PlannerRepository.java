package com.studentplanner.repository;

import com.studentplanner.model.PlannerItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlannerRepository
        extends JpaRepository<PlannerItem, Long> {

    List<PlannerItem> findByEmail(String email);
}