export interface Postulante {
    id: number,
    firstName: string,
    lastName: string,
    phone: string,
    birthday: string,
    curriculum: string | null,
    applicationId?: number
  }
  