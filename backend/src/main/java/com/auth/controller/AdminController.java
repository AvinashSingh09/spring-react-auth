package com.auth.controller;

import com.auth.dto.RoleUpdateRequest;
import com.auth.dto.UserDto;
import com.auth.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin", description = "Admin endpoints")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    @Operation(summary = "Get user by ID")
    public ResponseEntity<UserDto> getUserById(@PathVariable UUID id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{id}/disable")
    @Operation(summary = "Disable a user account")
    public ResponseEntity<UserDto> disableUser(@PathVariable UUID id) {
        UserDto user = userService.disableUser(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{id}/enable")
    @Operation(summary = "Enable a user account")
    public ResponseEntity<UserDto> enableUser(@PathVariable UUID id) {
        UserDto user = userService.enableUser(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{id}/role")
    @Operation(summary = "Assign role to a user")
    public ResponseEntity<UserDto> assignRole(
            @PathVariable UUID id,
            @Valid @RequestBody RoleUpdateRequest request) {
        UserDto user = userService.assignRole(id, request.getRole());
        return ResponseEntity.ok(user);
    }
}
