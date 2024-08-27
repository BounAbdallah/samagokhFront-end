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

  updateProjetStatut(id: number, statut: boolean): Observable<any> {
    const url = `${apiUrl}/update/projet/${id}`;
    const body = { statut };
    return this.http.patch<any>(url, body).pipe(
      tap(response => console.log('Réponse updateProjetStatut:', response)),
      catchError(this.handleError<any>('updateProjetStatut'))
    );
  }
  // Récupération de tous les projets
  getAllProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/projets`).pipe(
      tap(response => console.log('Réponse getAllProjets:', response)),
      catchError(this.handleError<any[]>('getAllProjets', []))
    );
  }

  // Méthode pour obtenir les détails d'un projet par ID
  getProjetDetails(projectId: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/details/projet/${projectId}`).pipe(
      tap(response => console.log('Réponse getProjetDetails:', response)),
      catchError(this.handleError<any>('getProjetDetails'))
    );
  }

  //vote du projet:

  getVoteStatistics(projectId: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/projets/${projectId}/votes/stats`).pipe(
      tap(response => console.log('Réponse getVoteStatistics:', response)),
      catchError(this.handleError<any>('getVoteStatistics'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      let errorMsg: string;

      if (error.error instanceof ErrorEvent) {
        errorMsg = `Erreur côté client : ${error.error.message}`;
      } else {
        errorMsg = `Erreur côté serveur : ${error.status}\nMessage: ${error.message}`;
        console.error(`Contenu de la réponse :`, error.error);
      }

      console.error(`${operation} échoué : ${errorMsg}`);
      return throwError(() => new Error(`${operation} échoué : ${errorMsg}`));
    };
  }


  }





