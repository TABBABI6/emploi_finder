import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Postulation} from "../Entity/Postulation";
import {Candidat} from "../Entity/Candidat";

@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addPostulation(postulation: Postulation): Observable<Postulation>{
    return this.http.post<Postulation>(`${this.apiServerUrl}/postulation/add`, postulation);
  }

  public deletePostulation(PostulationId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/postulation/delete/${PostulationId}`);
  }

  public updatePostulation(postulation: Postulation): Observable<Postulation>{
    return this.http.put<Postulation>(`${this.apiServerUrl}/postulation/update`, postulation);
  }

  public findPostulationById(id: number): Observable<Postulation>{
    return this.http.get<Postulation>(`${this.apiServerUrl}/postulation/${id}`);
  }

  public updatePostulationCV(postulation: FormData): Observable<Postulation>{
    return this.http.put<Postulation>(`${this.apiServerUrl}/postulation/update/cv`, postulation);
  }

  public updatePostulationLM(postulation: FormData): Observable<Postulation>{
    return this.http.put<Postulation>(`${this.apiServerUrl}/postulation/update/lm`, postulation);
  }

  public updatePostulationCVCandidatCV(postulation: Postulation): Observable<Postulation>{
    return this.http.put<Postulation>(`${this.apiServerUrl}/postulation/update/cv/candidat/cv`, postulation);
  }

}
