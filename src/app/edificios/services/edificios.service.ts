import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EdificiosService {

  constructor(
    private http: HttpClient,
  ) {}

  public getBuilding(propertyId:string): Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/edificio/${propertyId}`)
  }

  public createBuilding(data: any): Observable<any> {
    return this.http.post<any>(`${environment.BASE_URL}/edificio`, data); // Adicionando o corpo da requisição (data) aqui
  }

  public uploadImage(formData: FormData) {
    return this.http.post(`${environment.BASE_URL}/`, formData)
  }

  public getById(buildingId:string) {
    return this.http.get<any>(`${environment.BASE_URL}/edificio/item/${buildingId}`)
  }

  public updateBulding(data: any, id_building:string): Observable<any> {
    return this.http.patch<any>(`${environment.BASE_URL}/edificio/${id_building}`, data); // Adicionando o corpo da requisição (data) aqui
  }

}
