import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TestNiveau} from "../Entity/TestNiveau";
import {Recruteur} from "../Entity/Recruteur";
import {Offres} from "../Entity/Offres";
import {Candidat} from "../Entity/Candidat";
import {Score} from "../Components/TestNiveau/afficher-test/afficher-test.component";

@Injectable({
  providedIn: 'root'
})
export class TestNiveauService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addTest(test: TestNiveau): Observable<TestNiveau>{
    return this.http.post<TestNiveau>(`${this.apiServerUrl}/test/add`, test);
  }
  public getTests(): Observable<TestNiveau>{
    return this.http.get<TestNiveau>(`${this.apiServerUrl}/test/all`);
  }

  public addQuestionToTest(idtest: number, idquestion: number): Observable<TestNiveau>{
    return this.http.get<TestNiveau>(`${this.apiServerUrl}/test/${idtest}/${idquestion}`);
  }

  public addTestToRecruteur(idrecruteur: number, idtest: number): Observable<Recruteur>{
    return this.http.get<Recruteur>(`${this.apiServerUrl}/recruteur/${idrecruteur}/${idtest}`);
  }
  public addTestToOffre(idoffre: number, idtest: number): Observable<Offres>{
    return this.http.get<Offres>(`${this.apiServerUrl}/offres/testadd/${idoffre}/${idtest}`);
  }

  public addTestToAdmin(idadmin: number, idtest: number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/admin/${idadmin}/${idtest}`);
  }
  public findTestById(id: number): Observable<TestNiveau>{
    return this.http.get<TestNiveau>(`${this.apiServerUrl}/test/${id}`);
  }

  public addScoreToTest(idtest: number, idscore: number, idcandidat:number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/test/${idtest}/${idscore}/${idcandidat}`);
  }

  public addscore(score: any): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/scoretest/add`, score);
  }
  public deleteTest(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/test/delete/${id}`);
  }

  public getScoreByIdCandidat(idcandidat:number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/scoretest/candidat/${idcandidat}`);
  }
}
