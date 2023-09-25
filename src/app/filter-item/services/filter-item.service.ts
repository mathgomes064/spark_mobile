import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterItemService {

  constructor(
    private http: HttpClient,
  ) { }


  public getGroups(){
    return this.http.get<any>(`${environment.BASE_URL}/grupoItem`)
  }

  public getByGroup(group_id:string){
    return this.http.get<any>(`${environment.BASE_URL}/tipoItem/group/${group_id}`)
  }

  public getById(id:string){
    return this.http.get<any>(`${environment.BASE_URL}/tipoItem/${id}`)
  }

  public addItem(data:any){
    return this.http.post<any>(`${environment.BASE_URL}/itens`, data)
  }

  public getByRow(row:string){
    return this.http.get<any>(`${environment.BASE_URL}/tipoItem/filter/${row}`)
  }

  public getByItem(itemId:string){
    return this.http.get<any>(`${environment.BASE_URL}/tipoItem/filter/item/${itemId}`)
  }


}
