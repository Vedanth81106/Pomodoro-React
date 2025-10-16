package com.pomodoro.PomodoroApp.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name="users") //creates a table called users
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Email field cannot be blank!")
    @Email
    @Column(unique = true,nullable = false)
    private String email;

    @Column(nullable = false)
    @Size(min = 8,message = "Password must be atleast 8 characters long!")
    @NotBlank(message = "Password field cannot be blank!")
    private String password;

    @Column(nullable = false)
    @NotBlank(message = "Nickname cannot be blank!")
    private String nickname;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
