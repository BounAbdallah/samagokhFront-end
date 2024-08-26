import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  private  http = inject(HttpClient);
  getCommunes() {
    return this.http.get(`${apiUrl}/communes`);
  }
}
