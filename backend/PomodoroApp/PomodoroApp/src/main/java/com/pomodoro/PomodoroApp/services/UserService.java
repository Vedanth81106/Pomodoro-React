package com.pomodoro.PomodoroApp.services;

import com.pomodoro.PomodoroApp.dtos.LoginRequestDto;
import com.pomodoro.PomodoroApp.dtos.SignUpRequestDto;
import com.pomodoro.PomodoroApp.dtos.UserResponseDto;
import com.pomodoro.PomodoroApp.entities.User;
import com.pomodoro.PomodoroApp.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDto registerUser(SignUpRequestDto request){

        if(userRepository.findByEmail(request.email()).isPresent()){
            throw new IllegalStateException("Email is already in use!");
        }

        User newUser = new User();
        newUser.setEmail(request.email());
        newUser.setPassword(passwordEncoder.encode(request.password()));
        newUser.setNickname(request.nickname());

        User savedUser = userRepository.save(newUser);

        return new UserResponseDto(savedUser.getId(), savedUser.getEmail(), savedUser.getNickname());
    }

    public UserResponseDto loginUser(LoginRequestDto request){
        User user = userRepository.findByEmail(request.email())
                .orElseThrow( () -> new IllegalStateException("Invalid email or password! Please try again"));

        if(!passwordEncoder.matches(request.password(), user.getPassword())){
            throw new IllegalStateException("Invalid email or password! Please try again");
        }

        return new UserResponseDto(user.getId(), user.getEmail(), user.getNickname());
    }
}
