import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public login(payload: {email: string, password: string}): Observable<any>{
    return this.http.post<{token: string}>(`${environment.BASE_URL}/login`, payload)
  }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem('access_token');

    if(!token){
      return false
    }
    const jwtHelper = new JwtHelperService()

    return !jwtHelper.isTokenExpired(token)
  }
}
