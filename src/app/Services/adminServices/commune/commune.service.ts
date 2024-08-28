import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

    // url de l'api laravel 
  private apiUrl='http://127.0.0.1:8000/api';

  private currentCommuneId: number | null = null;

  constructor(private http:HttpClient) { }

  getCommunes(): Observable<any>{
    return this.http.get(`${this.apiUrl}/communes`);
  }

  // Method to fetch the total number of users
  getTotalCommunes(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/compteCommune`);
  }

  deleteCommune(id:number):Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/commune/${id}`);
   }

   addCommune(commune: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/communes`, commune);
  }


  // Les fonction pour la modification d'une ville 
  setCurrentCommuneId(id: number): void {
    this.currentCommuneId = id;
  }

  getCurrentCommuneId(): number | null {
    return this.currentCommuneId;
  }

  // Méthode pour mettre à jour une ville
  updateCommune(id: number, commune: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/communes/${id}`, commune);
  }

  getPopulationCommune(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/villes/${id}/population`);
  }

}
