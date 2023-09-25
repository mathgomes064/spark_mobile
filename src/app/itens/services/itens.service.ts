import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItensService {

  constructor(
    private http: HttpClient,
  ) { }

  public getTipoItens(): Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/tipoItem`)
  }

  public getAllItens(id:string): Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/compartimentos/${id}`)
  }

  public ItemUpdate(id:string, data:any): Observable<any>{
    return this.http.patch<any>(`${environment.BASE_URL}/itens/${id}`, data)
  }

  public ItemValueUpdate(data: any): Observable<any>{
    return this.http.patch<any>(`${environment.BASE_URL}/itemAtributo/edit-values`, data)
  }

  public getTipoItem(): Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/tipoItem`)
  }

  public getItemById(item_id: string){
    return this.http.get<any>(`${environment.BASE_URL}/itens/filter/${item_id}`)
  }


}
