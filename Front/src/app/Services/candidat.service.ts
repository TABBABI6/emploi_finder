import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidat} from "../Entity/Candidat";
import {Offres} from "../Entity/Offres";

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addCondidat(candidat: FormData): Observable<Candidat>{
    return this.http.post<Candidat>(`${this.apiServerUrl}/candidat/add`, candidat);
  }

  public findCandidatById(id: number): Observable<Candidat>{
    return this.http.get<Candidat>(`${this.apiServerUrl}/candidat/${id}`);
  }

  public updateCandidat(candidat: Candidat): Observable<Candidat>{
    return this.http.put<Candidat>(`${this.apiServerUrl}/candidat/update`, candidat);
  }

  public updateCandidatPostulation(candidat: Candidat): Observable<Candidat>{
    return this.http.put<Candidat>(`${this.apiServerUrl}/candidat/update/postulation`, candidat);
  }

  public updateCandidatCV(candidat: FormData): Observable<Candidat>{
    return this.http.put<Candidat>(`${this.apiServerUrl}/candidat/update/cv`, candidat);
  }

  public updateCandidatLM(candidat: FormData): Observable<Candidat>{
    return this.http.put<Candidat>(`${this.apiServerUrl}/candidat/update/lm`, candidat);
  }

  public deleteCandidat(candidatId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/candidat/delete/${candidatId}`);
  }

  public updateCandidatImage(candidat: FormData): Observable<Candidat>{
    return this.http.put<Candidat>(`${this.apiServerUrl}/candidat/update/image`, candidat);
  }

  public addPostulationToCandidat(candidatId: number, offreId: number, postulationId: number): Observable<void>{
    return this.http.get<void>(`${this.apiServerUrl}/candidat/postulation/${candidatId}/${offreId}/${postulationId}`);
  }

  public findCandidatByIdPostulation(id: number): Observable<number[]>{
    return this.http.get<number[]>(`${this.apiServerUrl}/candidat/postulation/${id}`);
  }
  public findCandidatsByIdPostulation(id: number): Observable<Candidat>{
    return this.http.get<Candidat>(`${this.apiServerUrl}/candidat/postulations/${id}`);
  }

  public findOffresForCandidat(id: number): Observable<Offres[]>{
    return this.http.get<Offres[]>(`${this.apiServerUrl}/candidat/offre_rec/${id}`);
  }

  public mailsender(id: number): Observable<Candidat>{
    return this.http.get<Candidat>(`${this.apiServerUrl}/user/sendNotification/${id}`);
  }

  public notificationUpdate(id: number): Observable<Candidat>{
    return this.http.get<Candidat>(`${this.apiServerUrl}/candidat/notification/${id}`);
  }

  public getUsers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiServerUrl}/user/get/year/all`);
  }

}
