import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompartimentoService {

  constructor(
    private http: HttpClient,
  ) { }

  public getCompartimentos(url: string): Observable<any>{
    return this.http.get<any>(url)
  }

  public registerCompartiemento(payload: {descricao: string, largura: number | null, comprimento: number | null, andar_compartimento: number | null, edificio_id: string}): Observable<any>{
    return this.http.post(`${environment.BASE_URL}/compartimentos`, payload)
  }

  public uploadImage(formData: FormData) {
    return this.http.post(`${environment.BASE_URL}/`, formData)
  }

}
