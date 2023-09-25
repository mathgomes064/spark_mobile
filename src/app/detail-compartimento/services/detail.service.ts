import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(
    private http: HttpClient,
  ) { }

  public getCompartimentos(url: string): Observable<any>{
    return this.http.get<any>(url)
  }

  public getCompartimentosById(url: string): Observable<any>{
    return this.http.get<any>(url)
  }

  public getPropriedadeById(url: string): Observable<any>{
    return this.http.get<any>(url)
  }

  public updateCompartimento(id:string, payload: {descricao: string, largura: number | null, comprimento: number | null, andar_compartimento: number | null}){
    return this.http.patch(`${environment.BASE_URL}/compartimentos/${id}`, payload)
  }

  public uploadImage(formData: FormData) {
    return this.http.post(`${environment.BASE_URL}/`, formData)
  }

  public getAnexosById(id: string): Observable<any>{
    return this.http.get(`${environment.BASE_URL}/edificio/anexos/${id}`, {
    })
  }
}
