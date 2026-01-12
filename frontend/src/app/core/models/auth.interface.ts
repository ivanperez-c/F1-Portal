export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  role: 'ADMIN' | 'TEAM' | 'USER';
}

export interface RegisterRequest {
  publicName: string;
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}