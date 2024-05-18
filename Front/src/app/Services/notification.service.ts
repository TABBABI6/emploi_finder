import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../Entity/Notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public findNotificationByIdCandidat(id: number): Observable<Notification[]>{
    return this.http.get<Notification[]>(`${this.apiServerUrl}/notification/candidat/${id}`);
  }

  public notificationVu(id: number): Observable<void>{
    return this.http.get<void>(`${this.apiServerUrl}/notification/vu/${id}`);
  }

  public sendNotification(id: number): Observable<void>{
    return this.http.get<void>(`${this.apiServerUrl}/notification/send/${id}`);
  }

}
