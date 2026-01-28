export interface Circuit {
  id: number;
  nombre: string;      
  ciudad: string;       
  pais: string;    
  trazado: string;    
  numero_vueltas: number;     
  longitud: number; 
  curvas_lentas: number;
  curvas_media: number;
  curvas_rapidas: number;
  calendario: boolean;
  fecha_carrera?: Date;
  fecha_creacion?: Date;
}