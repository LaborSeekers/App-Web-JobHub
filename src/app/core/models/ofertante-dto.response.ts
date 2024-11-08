// models/empresa.interface.ts
export interface Empresa {
    id: number;
    name: string;
    description: string;
  }
  
  // models/ofertante-dto.interface.ts
  export interface OfertanteDTO {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    birthday: string;
    reputationValue: number;
    reputation: string;
    empresa: Empresa;
  }
  