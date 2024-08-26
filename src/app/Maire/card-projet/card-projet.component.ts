import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../../projet.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface VoteStatistics {
  vote_total: number;
  vote_approve: number;
  vote_disapprove: number;
}

@Component({
  selector: 'app-details-projet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-projet.component.html',
  styleUrls: ['./card-projet.component.css']
})
export class DetailsProjetComponent implements OnInit {
  private projetService = inject(ProjetService);
  projetDetails: any;
  projectId: number = 0;
  hasVoted: boolean = false;
  voteStatistics: VoteStatistics | null = null; // Modifier le type ici

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      this.fetchProjetDetails();
      this.fetchVoteStatistics(); // Ajoutez cet appel pour récupérer les statistiques de votes
    });
  }

  fetchProjetDetails(): void {
    this.projetService.getProjetDetails(this.projectId).subscribe(
      (data) => {
        this.projetDetails = data;
        console.log('Détails du projet:', this.projetDetails);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du projet:', error);
      }
    );
  }

  fetchVoteStatistics(): void {
    this.projetService.getVoteStatistics(this.projectId).subscribe(
      (data: VoteStatistics) => { // Spécifiez le type ici
        this.voteStatistics = data;
        console.log('Statistiques de votes:', this.voteStatistics);
      },
      (error) => {
        console.error('Erreur lors de la récupération des statistiques de votes:', error);
      }
    );
  }

  approuverProjet(): void {
    this.projetService.updateProjetStatut(this.projectId, true).subscribe(
      (response) => {
        console.log('Projet approuvé:', response);
        this.hasVoted = true;
        this.projetDetails.statut = true;
      },
      (error) => {
        console.error('Erreur lors de l\'approbation du projet:', error);
      }
    );
  }

  desapprouverProjet(): void {
    this.projetService.updateProjetStatut(this.projectId, false).subscribe(
      (response) => {
        console.log('Projet désapprouvé:', response);
        this.hasVoted = true;
        this.projetDetails.statut = false;
      },
      (error) => {
        console.error('Erreur lors de la désapprobation du projet:', error);
      }
    );
  }
}
