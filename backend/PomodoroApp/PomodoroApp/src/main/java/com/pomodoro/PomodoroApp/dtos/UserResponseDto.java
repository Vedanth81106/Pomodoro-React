package com.pomodoro.PomodoroApp.dtos;

import java.util.UUID;

public record UserResponseDto(UUID id, String email, String nickname)
{}
