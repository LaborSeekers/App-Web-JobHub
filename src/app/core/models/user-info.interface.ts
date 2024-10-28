
export interface Empresa {
    id: number;
    name: string;
    description: string;
}

export interface UserInfo {
    id: number;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthday: string;
    empresa?: Empresa | null;
}