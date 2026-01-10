export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  role: 'ADMIN' | 'TEAM' | 'USER';
}