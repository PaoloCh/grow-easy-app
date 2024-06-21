import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { DataModel } from '../models/data.model';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class DbService {

 // coursesUrl = 'https://courses-service-groweasy.azurewebsites.net/api/v1/courses';
 // postsUrl = 'https://community-service-groweasy.azurewebsites.net/api/v1/posts';
    coursesUrl= 'http://localhost:8005/api/v1/courses';
    postsUrl='http://localhost:8006/api/v1/posts';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error ocurred ${error.status}, body was ${error.error}`);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was ${error.error}`
      );
    }
    return throwError(
      'Something happened with request, please try again later'
    );
  }

  //GET
  getCourses() {
    return this.http.get<any[]>(this.coursesUrl);
  }

  //GET POSTS
  getPosts() {
    return this.http.get<any[]>(this.postsUrl);
  }

  //GET TRENDS
  getTrends() {
    return this.http.get<any[]>(this.postsUrl + '/trends');
  }

  // POST POSTS
  createPost(post: any) {
    return this.http.post<any>(this.postsUrl, post, this.httpOptions);
  }
}
