import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}


export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'https://user-service-groweasy.azurewebsites.net/api/v1/users';
  //private apiUrl = 'http://localhost:8007/api/v1/users';
  //private emailApiUrl = 'http://localhost:8007/api/v1/email';

  private apiUrl = 'https://user-service-groweasy.azurewebsites.net/api/v1/users';
  private emailApiUrl = 'https://user-service-groweasy.azurewebsites.net/api/v1/email'; 

  private authStateSubject = new BehaviorSubject<User | null>(null);
  authState$: Observable<User | null> = this.authStateSubject.asObservable();

  constructor(private http: HttpClient, private injector: Injector) {}

  private getAuthService(): AuthService {
    return this.injector.get(AuthService);
  }

  logInWithEmailAndPassword(credential: Credential): Observable<any> {
    /*const url = `${this.apiUrl}`;
    return this.http.post<any>(url, credential).pipe(
      map(response => {
        const user = response.user as User;
        this.authStateSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return response;
      }),
      catchError(error => {
        console.error('Login failed', error);
        return throwError(() => new Error('Login failed: ' + error.message));
      })
    );*/
    const params = new HttpParams()
      .set('email', credential.email)
      .set('password', credential.password);

    return this.http.get<User>(this.apiUrl, { params }).pipe(
      map(response => {
        const user = response as User;
        this.authStateSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(`Email stored in localStorage: ${user.email}`); 
        return user;
      }),
      catchError(error => {
        console.error('Login failed', error);
        return throwError(() => new Error('Login failed: ' + error.message));
      })
    );
  }

  signUpWithEmailAndPassword(userData: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, userData).pipe(
      map(response => {
        const registeredUser = response;
        if (registeredUser) {
          this.setAuthState(registeredUser);
          localStorage.setItem('user', JSON.stringify(registeredUser));
        }
        return registeredUser;
      }),
      catchError(error => {
        console.error('Sign up failed', error);
        return throwError(() => new Error('Sign up failed: ' + error.message));
      })
    );
  }

  logOut(): void {
    this.authStateSubject.next(null);
    localStorage.removeItem('user');
  }

  setAuthState(user: User | null) {
    this.authStateSubject.next(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  getUserByEmail(email: string): Observable<User> {
    const url = `${this.emailApiUrl}/${encodeURIComponent(email)}`;
    return this.http.get<User>(url).pipe(
      map(response => {
       
        const user: User = {
          id: response.id,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
        };
        return user;
      }),
      catchError(error => {
        console.error('Error al obtener usuario por correo electrónico', error);
        return throwError(() => new Error('Error al obtener usuario por correo electrónico: ' + error.message));
      })
    );
  }
  
  
}
