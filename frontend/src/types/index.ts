export interface User {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    enabled: boolean;
    createdAt: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    user: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface ApiError {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    errors?: Record<string, string>;
}
