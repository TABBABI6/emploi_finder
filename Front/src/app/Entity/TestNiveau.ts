import {Question} from "./Question";
import {Score} from "../Components/TestNiveau/afficher-test/afficher-test.component";

export interface TestNiveau{
    id: number;
    score_min: number;
    nb_questions: number;
    duree: number;
    titre: string;
    questions: Question[];
    scoreTests: Score[];
}