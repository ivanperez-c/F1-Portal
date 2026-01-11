import { Driver } from './driver.interface';
import { Car } from './car.interface';
import { User } from './user.interface';

export interface Team {
  id: number;
  name: string;
  logo: string;
  drivers: Driver[];
  cars: Car[];
  users: User[];
}

