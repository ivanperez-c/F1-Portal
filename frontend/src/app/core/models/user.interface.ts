export interface User {
  username: string;
  role: 'ADMIN' | 'TEAM' | 'USER';
  teamId?: number;
}