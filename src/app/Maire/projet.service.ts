import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private http = inject(HttpClient);

  // Function to get headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Replace with your actual token retrieval method
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token in the headers
    });
  }

  // Récupération des projets par statut
  getProjetBySatut(statutSelectionne: boolean): Observable<any> {
    const url = `${apiUrl}/projets?statut=${statutSelectionne}`;
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      tap(response => console.log('Réponse getProjetBySatut:', response)),
      catchError(this.handleError) // Add error handling
    );
  }

  // Création de projet
  createProjet(projet: any): Observable<any> {
    return this.http.post(`${apiUrl}/add/projets`, projet, { headers: this.getHeaders() }).pipe(
      tap(response => console.log('Réponse createProjet:', response)),
      catchError(this.handleError) // Add error handling
    );
  }

  // Récupération des projets soumis
  getProjetSoumis(projet: any): Observable<any> {
    return this.http.get(`${apiUrl}/projets/publies`, { headers: this.getHeaders(), params: projet }).pipe(
      tap(response => console.log('Réponse getProjetSoumis:', response)),
      catchError(this.handleError) // Add error handling
    );
  }

  // Publication d'un projet
  publierProjet(id: number, statut: boolean): Observable<any> {
    return this.http.patch(`${apiUrl}/projets/${id}`, { statut: statut }, { headers: this.getHeaders() }).pipe(
      tap(response => console.log('Réponse publierProjet:', response)),
      catchError(this.handleError) // Add error handling
    );
  }

  // Récupération de tous les projets
  getAllProjets(): Observable<any> {
    return this.http.get(`${apiUrl}/projets`, { headers: this.getHeaders() }).pipe(
      tap(response => console.log('Réponse getAllProjets:', response)),
      catchError(this.handleError) // Add error handling
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`);
    }

    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
