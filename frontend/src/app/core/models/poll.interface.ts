export interface Poll {
  id: number;
  titulo: string;
  descripcion: string;
  limite: Date;
  id_pilotos: number[];
  votos?: { [id_pilotos: number]: number };
}