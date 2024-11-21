export interface OfertaLaboralRequest{
    title: string;
    description: string;
    requirements: string; //[]
    location: string;
    salary: string;
    benefits: string; //[]
    logo: string;
    scheduledPublishAt?: string|null;
    jobModality_id: string;
    status?: string;
    ofertante_id:string;
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