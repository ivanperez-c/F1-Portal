export interface AdminUserRequest {
  id: number;
  usuario: string;
  email: string;
  validado: boolean;
  fecha_registro: Date;
}