import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
  ) { }

  public register(payload: {name: string, telefone: string, email: string, password: string, confirmPassword: string}): Observable<any>{
    return this.http.post<{token: string}>(`${environment.BASE_URL}/user`, payload)
  }

  public registerUserPermissions(payload: any): Observable<any>{
    return this.http.post<{token: string}>(`${environment.BASE_URL}/permissions`, payload)
  }
}
