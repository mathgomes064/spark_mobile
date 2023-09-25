import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailPropriedadeService {

  constructor(
    private http: HttpClient,
  ) { }

  public getPropriedadeById(url: string): Observable<any>{
    return this.http.get<any>(url)
  }

  public getAnexosById(url: string): Observable<any>{
    return this.http.get<any>(url)
  }
}
