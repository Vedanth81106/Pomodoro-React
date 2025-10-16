package com.pomodoro.PomodoroApp.controllers;

import com.pomodoro.PomodoroApp.dtos.LoginRequestDto;
import com.pomodoro.PomodoroApp.dtos.SignUpRequestDto;
import com.pomodoro.PomodoroApp.dtos.UserResponseDto;
import com.pomodoro.PomodoroApp.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signUp(@Valid @RequestBody SignUpRequestDto signUpRequestDto){

        UserResponseDto createdUser = userService.registerUser(signUpRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);

    }

    @PostMapping("login")
    public ResponseEntity<UserResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequestDto){

        UserResponseDto userResponseDto = userService.loginUser(loginRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
    }
}
