import {Image} from "./image";
import {Offres} from "./Offres";
import {TestNiveau} from "./TestNiveau";

export interface Recruteur{
    id: number,
    nom: string,
    prenom: string,
    mail: string,
    mdp: string,
    role: string,
    adresse: string,
    date_naissance: string,
    image: Image,
    num_tel: number,
    offres: Offres[],
    testNiveaus: TestNiveau[]
}