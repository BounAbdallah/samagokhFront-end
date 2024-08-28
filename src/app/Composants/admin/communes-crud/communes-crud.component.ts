import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommuneService } from '../../../Services/adminServices/commune/commune.service';
import { VilleService } from '../../../Services/adminServices/ville/ville.service';

interface Commune {
  ville_id: number;
  id: number;
  libelle: string;
  description: string; 
}

interface Ville {
  id: number;
  libelle: string;
  description: string; 
}

@Component({
  selector: 'app-communes-crud',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './communes-crud.component.html',
  styleUrl: './communes-crud.component.css'
})
export class CommunesCrudComponent implements OnInit {

  myForm: FormGroup;
  communes: Commune[] = [];
  newCommune: string = '';
  isEditMode: boolean = false;

  villes: Ville[] = [];


  constructor(private communeService: CommuneService, private fb: FormBuilder,private villeService: VilleService) {
    this.myForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      ville_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCommunes();
    this.fetchVilles();
  }

  fetchCommunes() {
    this.communeService.getCommunes().subscribe(
      (response: any) => {
        console.log(response.data);
        this.communes = response;
        if (response.data) {
          this.communes = response.data;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }



  onSubmit(): void {
    if (this.myForm.valid) {
      const newcommune = this.myForm.value;
      const currentcommuneId = this.communeService.getCurrentCommuneId();
  
      if (currentcommuneId) {
        // Si une commune est en cours de modification, on fait une mise à jour
        this.communeService.updateCommune(currentcommuneId, newcommune).subscribe(
          response => {
            console.log('commune modifiée avec succès:', response);
            this.fetchCommunes();  // Recharger la liste des communes après la modification
            this.myForm.reset();  // Réinitialiser le formulaire après la modification
            // this.communeService.setCurrentcommuneId(id: number | null);
          },
          error => {
            console.error('Erreur lors de la modification de la commune', error);
          }
        );
      } else {
        // Sinon, on fait un ajout
              const newcommune = this.myForm.value;
          this.communeService.addCommune(newcommune).subscribe(
         response => {
          console.log('commune ajoutée avec succès:', response);  // Ajoutez ceci
          this.fetchCommunes();  // Recharger la liste des communes après l'ajout
          this.myForm.reset();  // Réinitialiser le formulaire après l'ajout
        },
        error => {
          console.error('Erreur lors de l\'ajout de la commune', error);
        }
      );
    }
    this.isEditMode = false;
    }
  }


   //fonction pour ouvrire le modal popup avec les valeur à modifier
   editCommune(commune: Commune): void {
    this.myForm.patchValue({
      libelle: commune.libelle,
      description: commune.description,
      ville_id: commune.ville_id 
    });
    this.communeService.setCurrentCommuneId(commune.id); // Stocker l'ID de la commune à modifier
    this.isEditMode = true;
  }

  deleteCommune(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rôle?')) { // Ajouter une confirmation avant la suppression
      this.communeService.deleteCommune(id).subscribe(
        () => this.fetchCommunes(),  // Recharger les rôles après la suppression
        error => console.error('Erreur lors de la suppression du rôle', error)
      );
    }
  }



  fetchVilles() {
    this.villeService.getVilles().subscribe(
      (response: any) => {
        console.log(response.data);
        this.villes = response;
        if (response.data) {
          this.villes = response.data;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
