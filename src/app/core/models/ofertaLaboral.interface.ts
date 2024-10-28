export interface ofertalLaboral{
  id: number
  title: string;
  description: string;
  requirements: string; //[]
  location: string;
  salary: string;
  benefits: string; //[]
  logo: string;
  scheduledPublishAt: string|null;
  jobModalityName: string;
  status: string;
  ofertanteName:string;
  reputacion: string;
  
  requisitos: string[]; //para el frontend (posiblemente temporal ya que hay mejores maneras de hacer esto sin necesidad de crear esta variable en el modelo. El backend deberia enviar una lista de requisitos en lugar de un solo string)
  beneficios: string[]; //para el frontend (posiblemente temporal
}
  /*id?: number
  logo: string;
  puesto: string;
  location: string;
  salary: string;
  type: string;
  reputacion: string;
  fecha: string;
  estado: string;
  descripcion: string;
  requisitos: string[];
  beneficios: string[];
  puestoIMG: string;
  jornadaIMG: string;
  ubicacionIMG: string;
  sueldoIMG: string;*/