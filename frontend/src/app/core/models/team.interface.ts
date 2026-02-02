import { Driver } from './driver.interface';
import { Car } from './car.interface';
import { User } from './user.interface';

export interface Team {
  id: number;
  nombre: string;
  logo: string;
  twitter: string;
  id_usuario_creador: number;
  drivers: Driver[];
  cars: Car[];
  users: User[];
}

