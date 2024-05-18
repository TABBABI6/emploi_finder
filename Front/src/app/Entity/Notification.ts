import {Offres} from "./Offres";
import {Candidat} from "./Candidat";

export interface Notification{
    id: number;
    vu: boolean;
    date: string;
    offres: Offres;
    candidat: Candidat;
}