// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private villesSource = new BehaviorSubject<any[]>([]);
  villes$ = this.villesSource.asObservable();

  updateVilles(villes: any[]) {
    this.villesSource.next(villes);
  }
}