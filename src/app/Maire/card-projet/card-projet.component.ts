import { Component, Input, OnInit } from '@angular/core';
import { ProjetService } from '../projet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-projet',
  standalone: true,
  templateUrl: './card-projet.component.html',
  styleUrls: ['./card-projet.component.css']
})
export class CardProjetComponent implements OnInit {
  @Input() projet: any | null = null; // Utilisez 'any' pour une flexibilité maximale
  voteStatistics: { vote_approve: number; vote_disapprove: number } = { vote_approve: 0, vote_disapprove: 0 };

  constructor(private projetService: ProjetService, private router: Router) {}

  ngOnInit(): void {
    if (this.projet && this.projet.id !== undefined) {
      this.fetchVoteStatistics(this.projet.id);
    }
  }

  fetchVoteStatistics(projectId: number): void {
    this.projetService.getVoteStatistics(projectId).subscribe(
      (data) => {
        this.voteStatistics = data;
        console.log('Statistiques de votes:', this.voteStatistics);
      },
      (error) => {
        console.error('Erreur lors de la récupération des statistiques de votes:', error);
      }
    );
  }

  viewDetails(): void {
    if (this.projet && this.projet.id !== undefined) {
      this.router.navigate(['/detail-projet', this.projet.id]);
    }
  }
}
