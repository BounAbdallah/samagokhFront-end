import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  // url de l'api laravel 
  private apiUrl='http://127.0.0.1:8000/api/roles'

  constructor(private http:HttpClient) { }
  // getRoles():Observable<any>{
  //     return this.http.get(this.apiUrl);
  // }

  getRoles(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((response: any) => {
        // La réponse est un objet paginé, retournons-le tel quel
        return response;
      })
    );
  }
  getRole(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }

 createRole(role: any): Observable<any> {
  return this.http.post(this.apiUrl, role);
}

  // updateRole(id:number , role:any):Observable<any>{
  //   return this.http.put(`${this.apiUrl}/${id}`,role);
  // }

  deleteRole(id:number):Observable<any> {
   return this.http.delete(`${this.apiUrl}/${id}`);
  }



   // ... méthodes existantes ...

   getPermissions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/permissions`);
  }

  getRolePermissions(roleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles/${roleId}/permissions`);
  }

  updateRole(id: number, role: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/roles/${id}`, role);
  }
}
