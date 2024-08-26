import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { apiUrl } from '../apiUrl'; // Assurez-vous que cette importation est correcte

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private http = inject(HttpClient);

  // Récupération des projets par statut
  getProjetByStatut(statutSelectionne: boolean): Observable<any[]> {
    const url = `${apiUrl}/projets?statut=${statutSelectionne}`;
    return this.http.get<any[]>(url).pipe(
      tap(response => console.log('Réponse getProjetByStatut:', response)),
      catchError(this.handleError<any[]>('getProjetByStatut', []))
    );
  }

  // Création de projet
  createProjet(projet: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/add/projets`, projet).pipe(
      tap(response => console.log('Réponse createProjet:', response)),
      catchError(this.handleError<any>('createProjet'))
    );
  }

  // Récupération des projets soumis
  getProjetSoumis(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/projets/publies`, { params }).pipe(
      tap(response => console.log('Réponse getProjetSoumis:', response)),
      catchError(this.handleError<any[]>('getProjetSoumis', []))
    );
  }

  // Publication d'un projet
  publierProjet(id: number, statut: boolean): Observable<any> {
    return this.http.patch<any>(`${apiUrl}/projets/${id}`, { statut }).pipe(
      tap(response => console.log('Réponse publierProjet:', response)),
      catchError(this.handleError<any>('publierProjet'))
    );
  }

  // Récupération de tous les projets
  getAllProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/projets`).pipe(
      tap(response => console.log('Réponse getAllProjets:', response)),
      catchError(this.handleError<any[]>('getAllProjets', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} échoué : ${error.message}`);
      return throwError(() => new Error(`${operation} échoué : ${error.message}`));
    };
  }
}
