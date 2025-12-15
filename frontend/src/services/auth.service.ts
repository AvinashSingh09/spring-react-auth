import api from './api';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    refresh: async (refreshToken: string): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/users/me');
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },
};

export const adminService = {
    getAllUsers: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/admin/users');
        return response.data;
    },

    disableUser: async (id: string): Promise<User> => {
        const response = await api.put<User>(`/admin/users/${id}/disable`);
        return response.data;
    },

    enableUser: async (id: string): Promise<User> => {
        const response = await api.put<User>(`/admin/users/${id}/enable`);
        return response.data;
    },

    assignRole: async (id: string, role: 'USER' | 'ADMIN'): Promise<User> => {
        const response = await api.put<User>(`/admin/users/${id}/role`, { role });
        return response.data;
    },
};
