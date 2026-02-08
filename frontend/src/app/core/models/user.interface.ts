export interface User {
  id: number;
  usuario: string;
  rol: 'administrador' | 'responsable_equipo' | 'usuario';
  id_equipo?: number;
  nombre_usuario?: string;
}