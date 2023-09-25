import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class QuadrosService {

  constructor(
    private http: HttpClient
  ) { }

  public getQuadrosCompartimento(compartimentoId:string): Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/quadro/${compartimentoId}`)
  }
  public createQuadro(data:any){
    return this.http.post(`${environment.BASE_URL}/quadro`, data)
  }

  public getQuadroById(quadro_id:string){
    return this.http.get<any>(`${environment.BASE_URL}/quadro/filter/${quadro_id}`)
  }

  public getQuadroWithGroup(quadro_id:string){
    return this.http.get<any>(`${environment.BASE_URL}/quadro/filter/dps/${quadro_id}`)
  }

  public updateQuadro(quadro_id: string, payload: any){
    return this.http.patch(`${environment.BASE_URL}/quadro/${quadro_id}`, payload)
  }

  public createDpsTipo(data: any){
    return this.http.post<any>(`${environment.BASE_URL}/dps_tipo`, data)
  }

  public getDpsTipo(){
    return this.http.get<any>(`${environment.BASE_URL}/dps_tipo`)
  }

}


