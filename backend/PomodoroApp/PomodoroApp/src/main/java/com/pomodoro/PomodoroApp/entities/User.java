package com.pomodoro.PomodoroApp.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="users") //creates a table called users
@Data
public class User implements UserDetails {

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return "";
    }
}
