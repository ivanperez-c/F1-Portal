export interface AdminUserRequest {
  id: number;
  username: string;
  email: string;
  isValidated: boolean;
  registrationDate: Date;
}