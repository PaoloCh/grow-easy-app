import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private urlApi = 'https://articles-service-v2.azurewebsites.net/api/v1/articles';
  //private urlApi='http://localhost:8008/api/v1/articles';

  constructor(private http: HttpClient) { }

  public getData(): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi);
  }

  public deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`);
  }

  public getArticleById(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${id}`);
  }

  public updateArticle(id: number, updatedData: any): Observable<any> {
    return this.http.patch(`${this.urlApi}/${id}`, updatedData);
  }

  public addArticle(newArticle: any): Observable<any> {
    return this.http.post(this.urlApi, newArticle);
  }
}
