import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-banniere',
  standalone: true,
  templateUrl: './banniere.component.html',
  styleUrls: ['./banniere.component.css']
})
export class BanniereComponent  {
  currentTime: string = '';
  private timeSubscription: Subscription = new Subscription();

  // ngOnInit(): void {
  //   // Met à jour l'heure toutes les secondes
  //   this.timeSubscription = interval(1000).subscribe(() => {
  //     this.updateTime();
  //   });
  // }

  // ngOnDestroy(): void {
  //   // Annule l'abonnement pour éviter les fuites de mémoire
  //   this.timeSubscription.unsubscribe();
  // }

  // private updateTime(): void {
  //   const now = new Date();
  //   this.currentTime = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  // }
}
