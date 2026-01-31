export interface LoginRequest {
  usuario: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  role: 'ADMIN' | 'TEAM' | 'USER';
}

export interface RegisterRequest {
  nombre: string;
  usuario: string;
  email: string;
  passwdUsuario: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}