import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { projetModel } from './projet.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private apiUrl = 'http://127.0.0.1:8000/api/projets';

  constructor(private http: HttpClient) {}

  getAllProjets(): Observable<projetModel[]> {
    return this.http.get<projetModel[]>(this.apiUrl);
  }

  getProjet(id: number): Observable<projetModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<projetModel>(url);
  }

  createProjet(projet: projetModel): Observable<projetModel> {
    return this.http.post<projetModel>(this.apiUrl, projet);
  }

  updateProjet(projet: projetModel): Observable<projetModel> {
    const url = `${this.apiUrl}/${projet.id}`;
    return this.http.put<projetModel>(url, projet);
  }

  deleteProjet(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
