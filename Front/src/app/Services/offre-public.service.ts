import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OffresPublic} from "../Entity/OffresPublic";

@Injectable({
  providedIn: 'root'
})
export class OffrePublicService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getOffresKeejob(): Observable<OffresPublic[]>{
    return this.http.get<OffresPublic[]>(`${this.apiServerUrl}/offres/public/keejob`);
  }
  public getOffresOptioncarrier(): Observable<OffresPublic[]>{
    return this.http.get<OffresPublic[]>(`${this.apiServerUrl}/offres/public/optioncarrier`);
  }
  public getOffresLikedin(): Observable<OffresPublic[]>{
    return this.http.get<OffresPublic[]>(`${this.apiServerUrl}/offres/public/linkedin`);
  }
}
