import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      window.localStorage.setItem(key, value);
    } else {
      // Gérer une alternative de stockage côté serveur, comme une variable en mémoire ou une base de données
    }
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      return window.localStorage.getItem(key);
    }
    // Retourner une alternative côté serveur ou null si non disponible
    return null;
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      window.localStorage.removeItem(key);
    } else {
      // Gérer la suppression de l'alternative de stockage côté serveur
    }
  }
}
