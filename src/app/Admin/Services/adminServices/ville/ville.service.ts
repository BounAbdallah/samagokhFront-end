import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  private apiUrl='http://127.0.0.1:8000/api'
  private currentVilleId: number | null = null;
  constructor(private http : HttpClient) { }

  getVilles():Observable<any>{
    return this.http.get(`${this.apiUrl}/villes`);
  }

  getShowVilles(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/villes/${id}`);
  }

  deleteVille(id:number):Observable<any> {
    return this.http.delete(`${this.apiUrl}/villes/${id}`);
   }

   addVille(ville: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/villes`, ville);
  }


  // Les fonction pour la modification d'une ville 
  setCurrentVilleId(id: number): void {
    this.currentVilleId = id;
  }

  getCurrentVilleId(): number | null {
    return this.currentVilleId;
  }

  // Méthode pour mettre à jour une ville
  updateVille(id: number, ville: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/villes/${id}`, ville);
  }

}
