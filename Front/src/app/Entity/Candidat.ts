import {Image} from "./image";
import {Postulation} from "./Postulation";

export interface Candidat {
    id: number;
    nom: string;
    prenom: string;
    mdp: string;
    mail: string;
    adresse: string,
    date_naissance: string;
    fonction: string;
    image: Image;
    cv: Image;
    lettre_motivation: Image;
    competances: [];
    formations: [];
    postulations: Postulation[];


}