// import { Component, inject } from '@angular/core';
// import { ProjetService } from '../../projet.service';
// import { projetModel } from '../../projet.model';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-ajout-projet',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './ajout-projet.component.html',
//   styleUrl: './ajout-projet.component.css'
// })
// export class AjoutProjetComponent {


//   // injection de dependance 
//   private CreationProjectService = inject(ProjetService);

//   // declaration des varibles
//   project:projetModel={};
//   tabprojet:projetModel[]=[];
//   isCollapsed = false;
//   ngOnInit(): void {

//   }

//   // methode pour la creation d'un projet 
//   ajoutProject(){
//     let formdata = new FormData();
//     if(this.project.titre && this.project.attente && this.project.objectif && this.project.budget  && this.project.user_id && this.project.categorie && this.project.cible && this.project.description &&   this.project.image ){
//       formdata.append("titre",this.project.titre);
//       formdata.append("attente",this.project.attente);
//       formdata.append("budget",this.project.budget);
//       formdata.append("categorie",this.project.categorie);
//       formdata.append("cible",this.project.cible);
//       formdata.append("description",this.project.description);
//       formdata.append("photo",this.project.image) ; 
//       formdata.append("objectif",this.project.objectif) ; 
//       formdata.append("user_id", this.project.user_id.toString());

//     }

//     this.CreationProjectService.createProjet(formdata).subscribe(
//       (response:any)=>{
//         console.log(response.data);
//         if(response.data){
//           this.project={};
//         }
//       }
//     )
//   }



//   toggleSidebar() {
//     this.isCollapsed = !this.isCollapsed;
//   }

//   onSubmit() {
//     // Logique de soumission du formulaire ici
//     console.log(this.project);
//   }
// }




import { Component, inject } from '@angular/core';
import { ProjetService } from '../../projet.service';
import { projetModel } from '../../projet.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajout-projet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.css']
})
export class AjoutProjetComponent {

  private projetService = inject(ProjetService);

  project: projetModel = {};
  isCollapsed = false;

  ajoutProject() {
    if (this.isValidProject()) {
      const projectData = {
        titre: this.project.titre,
        commune_id: this.project.commune_id,
        description: this.project.description,
        objectif: this.project.objectif,
        attente: this.project.attente,
        cible: this.project.cible,
        categorie: this.project.categorie,
        statut: this.project.statut ? 1 : 0,
        etat: this.project.etat ? 1 : 0,
        budget: parseFloat(this.project.budget || '0'),
        image: this.project.image || null,
        user_id: this.project.user_id || null
      };
  
      this.projetService.createProjet(projectData).subscribe(
        (response: any) => {
          console.log('Réponse du serveur:', response);
          if (response && response.id) {
            this.project = {}; // Réinitialiser les champs après la soumission
          } else {
            console.error('Réponse du serveur ne contient pas `id`');
          }
        },
        (error: any) => {
          console.error('Erreur lors de la création du projet', error);
        }
      );
    } else {
      console.log('Tous les champs obligatoires ne sont pas remplis');
    }
  }
  

  private isValidProject(): boolean {
    return !!(
      this.project.titre &&
      this.project.commune_id &&
      this.project.description &&
      this.project.objectif &&
      this.project.attente &&
      this.project.cible &&
      this.project.categorie &&
      // this.project.statut !== undefined && 
      // this.project.etat !== undefined && 
      this.project.budget
    );
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onSubmit() {
    console.log(this.project);
  }
}
