export interface Circuit {
  id: number;
  name: string;      
  city: string;       
  country: string;    
  image: string;    
  laps: number;     
  length: number; 
  cornersSlow: number;
  cornersMedium: number;
  cornersFast: number;
  isInCalendar: boolean;
  date?: Date;
}