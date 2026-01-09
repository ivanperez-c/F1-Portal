import { Driver } from './driver.interface';

export interface Team {
  id: number;
  name: string;
  logo: string;
  drivers: Driver[];
}