import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../Entity/Question";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addQuestion(question: Question): Observable<Question>{
    return this.http.post<Question>(`${this.apiServerUrl}/question/add`, question);
  }
}
