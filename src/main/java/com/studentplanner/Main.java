
package com.studentplanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void showLink() {
        System.out.println("Student Academic Planner Started!");
        System.out.println("Open: http://localhost:8080/");
    }
}
