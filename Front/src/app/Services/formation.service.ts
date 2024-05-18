import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Formation} from "../Entity/Formation";
import {Competance} from "../Entity/Competance";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  /*public getFormations(): Observable<Formation[]>{
    return this.http.get<Formation[]>(`${this.apiServerUrl}/formation/all`);
  }*/

  public addFormation(formation: Formation): Observable<Formation>{
    return this.http.post<Formation>(`${this.apiServerUrl}/formation/add`, formation);
  }

  public addFormationToCandidat(candidatId: number, formationId: number): Observable<void>{
    return this.http.get<void>(`${this.apiServerUrl}/candidat/formation/${candidatId}/${formationId}`);
  }

  public findFormationById(id: number): Observable<Formation>{
    return this.http.get<Formation>(`${this.apiServerUrl}/formation/${id}`);
  }

  public updateFormation(formation: Formation): Observable<Formation>{
    return this.http.put<Formation>(`${this.apiServerUrl}/formation/update`, formation);
  }

  public deleteFormation(formationId: number, candidatId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/formation/delete/${formationId}/${candidatId}`);
  }

}
