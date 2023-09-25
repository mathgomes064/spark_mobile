import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnexosService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAnexosById(id_item:string): Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/edificio/anexos/${id_item}`)
  }
}
