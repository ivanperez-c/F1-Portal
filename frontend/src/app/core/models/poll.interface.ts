export interface Poll {
  id: number;
  titulo: string;
  descripcion: string;
  limite: Date;
  driverIds: number[];
  votes?: { [driverId: number]: number };
}