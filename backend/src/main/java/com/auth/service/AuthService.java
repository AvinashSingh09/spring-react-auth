package com.auth.service;

import com.auth.dto.*;
import com.auth.entity.RefreshToken;
import com.auth.entity.Role;
import com.auth.entity.User;
import com.auth.exception.EmailAlreadyExistsException;
import com.auth.repository.UserRepository;
import com.auth.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtUtil jwtUtil;
        private final AuthenticationManager authenticationManager;
        private final RefreshTokenService refreshTokenService;

        public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                        JwtUtil jwtUtil, AuthenticationManager authenticationManager,
                        RefreshTokenService refreshTokenService) {
                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtUtil = jwtUtil;
                this.authenticationManager = authenticationManager;
                this.refreshTokenService = refreshTokenService;
        }

        @Transactional
        public AuthResponse register(RegisterRequest request) {
                if (userRepository.existsByEmail(request.getEmail())) {
                        throw new EmailAlreadyExistsException(request.getEmail());
                }

                User user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .enabled(true)
                                .build();

                user = userRepository.save(user);

                String accessToken = jwtUtil.generateToken(user);
                RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

                return AuthResponse.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken.getToken())
                                .tokenType("Bearer")
                                .user(mapToDto(user))
                                .build();
        }

        public AuthResponse login(LoginRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow();

                String accessToken = jwtUtil.generateToken(user);
                RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

                return AuthResponse.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken.getToken())
                                .tokenType("Bearer")
                                .user(mapToDto(user))
                                .build();
        }

        public AuthResponse refreshToken(RefreshTokenRequest request) {
                RefreshToken refreshToken = refreshTokenService.findByToken(request.getRefreshToken());
                refreshTokenService.verifyExpiration(refreshToken);

                User user = refreshToken.getUser();
                String accessToken = jwtUtil.generateToken(user);

                return AuthResponse.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken.getToken())
                                .tokenType("Bearer")
                                .user(mapToDto(user))
                                .build();
        }

        private UserDto mapToDto(User user) {
                return UserDto.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .enabled(user.isEnabled())
                                .createdAt(user.getCreatedAt())
                                .build();
        }
}
