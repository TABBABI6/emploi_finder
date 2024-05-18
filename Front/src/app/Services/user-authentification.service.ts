import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Offres} from "../Entity/Offres";

@Injectable({
  providedIn: 'root'
})
export class UserAuthentificationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public login(mail: string, mdp: string):Observable<any>{
    return this.http.get<any>(this.apiServerUrl + `/user/login/${mail}/${mdp}`);
  }

  public getUserId(){
    return JSON.parse(localStorage.getItem('userId')!);
  }

  public setUserId(userId: number) {
    localStorage.setItem('userId', JSON.stringify(userId));
  }

  public setRoles(role: string) {
    localStorage.setItem('role' , JSON.stringify(role));
  }

  public getRole(): string {
    return JSON.parse(localStorage.getItem('role')!);
  }


  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRole();
  }

  public findUserById(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/user/get/${id}`);
  }

  public getAllUsers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiServerUrl}/user/get/all`);
  }
}
