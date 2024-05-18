import {Postulation} from "./Postulation";
import {TestNiveau} from "./TestNiveau";

export interface Offres{
    id : number,
    date_ajout: string,
    date_expiration: string,
    description: string,
    domaine: string,
    titre: string,
    type_poste: string,
    lieu: string,
    experience: string,
    etude: string,
    salaire: number,
    disponibilite: string,
    postulations: Postulation[],
    testNiveaus:TestNiveau[],

}