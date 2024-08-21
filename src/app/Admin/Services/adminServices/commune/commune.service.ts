import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

    // url de l'api laravel 
  private apiUrl='http://127.0.0.1:8000/api'

  constructor(private http:HttpClient) { }

  getCommunes(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  // Method to fetch the total number of users
  getTotalCommunes(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/compteCommune`);
  }

}
