package com.pomodoro.PomodoroApp.dtos;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignUpRequestDto(
        @NotBlank(message = "Email field cannot be blank!")
        @Email
        @Column(unique = true,nullable = false)
        String email,

        @Column(nullable = false)
        @Size(min = 8,message = "Password must be atleast 8 characters long!")
        @NotBlank(message = "Password field cannot be blank!")
        String password,

        @Column(nullable = false)
        @NotBlank(message = "Nickname cannot be blank!")
        String nickname
)

{}
