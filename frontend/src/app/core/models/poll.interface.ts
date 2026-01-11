export interface Poll {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  driverIds: number[];
  votes?: { [driverId: number]: number };
}