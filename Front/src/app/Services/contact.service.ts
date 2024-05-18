import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contact} from "../Entity/Contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public send(Contact : Contact): Observable<Contact>{
    return this.http.post<Contact>(`${this.apiServerUrl}/user/sendEmailMessage`,Contact );
  }
}
