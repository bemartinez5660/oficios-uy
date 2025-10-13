export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isServiceProvider: boolean;
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isServiceProvider: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}