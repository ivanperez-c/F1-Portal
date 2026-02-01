export interface User {
  usuario: string;
  rol: 'administrador' | 'responsable_equipo' | 'usuario';
  teamId?: number;
}