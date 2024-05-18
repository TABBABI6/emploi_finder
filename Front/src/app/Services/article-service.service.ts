import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../Entity/Article";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }
  private apiServerUrl = environment.apiBaseUrl;

  public addArticle(article:FormData): Observable<Article>{
    return this.http.post<Article>(`${this.apiServerUrl}/articles/add`, article);
  }

  public findArticleById(id: number): Observable<Article>{
    return this.http.get<Article>(`${this.apiServerUrl}/articles/${id}`);
  }

  public updateArticle(article: Article): Observable<Article>{
    return this.http.put<Article>(`${this.apiServerUrl}/articles/update`, article);
  }
  public deleteArticle(articleId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/articles/delete/${articleId}`);
  }

  public getAllArticle(): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.apiServerUrl}/articles/all`);
  }
}
