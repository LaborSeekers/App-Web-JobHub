export interface PostulanteCurriculum {
    id?: number;
    postulante?: object;
    content?: string;
    languages?: object[];
    workExperience?:object[];
    education?: object[];
    //skills?: object[];
}