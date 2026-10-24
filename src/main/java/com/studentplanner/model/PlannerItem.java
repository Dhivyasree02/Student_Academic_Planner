
package com.studentplanner.model;

import jakarta.persistence.*;

@Entity
public class PlannerItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String email;
    public String category;
    public String details;
}
