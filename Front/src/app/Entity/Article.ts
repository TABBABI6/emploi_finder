import {Image} from "./image";

export interface Article{
    id: number,
    titre:string,
    date_creation:string,
    description:string,
    sous_titre1:string,
    description1:string,
    sous_titre2:string,
    description2:string,
    sous_titre3:string,
    description3:string,
    sous_titre4:string,
    description4:string,
    sous_titre5:string,
    description5:string,
    image: Image
}