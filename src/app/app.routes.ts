import { ListeHabitantsCommuneComponent } from './Maire/composants/liste-habitants-commune/liste-habitants-commune.component';
import { ListeProjetsMaireComponent } from './Maire/composants/liste-projets-maire/liste-projets-maire.component';
import { Routes } from '@angular/router';
import { platform } from 'os';
import { PlateformeComponent } from './User/plateforme/plateforme.component';
import { ListeProjetComponent } from './User/liste-projet/liste-projet.component';
import { LoginComponent } from './User/auth/login/login.component';
import { RegisterComponent } from './User/auth/register/register.component';
import { DashboardMaireComponent } from './Maire/composants/dashboard-maire/dashboard-maire.component';
import { CreerProjetComponent } from './Maire/composants/creer-projet/creer-projet.component';
import { ModificationProjetComponent } from './Maire/composants/modification-projet/modification-projet.component';
import { ProjetHabitantCommuneComponent } from './Maire/composants/projet-habitant-commune/projet-habitant-commune.component';
import { DashbaordHabitantComponent } from './Habitant/composants/dashbaord-habitant/dashbaord-habitant.component';
import { ListeProjetsHabitantComponent } from './Habitant/composants/liste-projets-habitant/liste-projets-habitant.component';
import { AjoutProjetComponent } from './Habitant/composants/ajout-projet/ajout-projet.component';
import { HabitantProjetModificationComponent } from './Habitant/composants/habitant-projet-modification/habitant-projet-modification.component';
import { ProjetPublierComponent } from './Habitant/composants/projet-publier/projet-publier.component';
import { ListCommuneComponent } from './Admin/Services/adminServices/list-commune/list-commune.component';
import { VilleComponent } from './Admin/Services/adminServices/ville copy/ville.component';
import { RolesComponent } from './Admin/Services/adminServices/roles/roles.component';
import { DashboardAdminComponent } from './Admin/Services/adminServices/dashboard-admin/dashboard-admin.component';
import { DetailProjetComponent } from './Habitant/detail-projet/detail-projet.component';

export const routes: Routes = [

//Page de Faby


//Route pour Uesr simple
{path: "", pathMatch: "full", redirectTo: "home"},

{path: "home", component : PlateformeComponent},

{path: "ListeProjet", component: ListeProjetComponent},

{path: "login", component: LoginComponent},

{path: "register", component: RegisterComponent},

//Fin Route pour Uesr simple

//Route pour Mr le maire


{path: "dashboard", component: DashboardMaireComponent},
{path: "liste-projet-maire", component: ListeProjetsMaireComponent},
{path: "creer-projet", component: CreerProjetComponent},
{path: "modifier-projet/maire", component: ModificationProjetComponent},
{path: "liste-habitants-commune", component: ListeHabitantsCommuneComponent},
{path: "liste-projets-habitant-commune", component: ProjetHabitantCommuneComponent},



// Route pour honorable habitant

{path: "dashboard-habitant", component: DashbaordHabitantComponent},
{path: "liste-projet-habitant", component: ListeProjetsHabitantComponent},
{path: "ajouter-projet", component: AjoutProjetComponent},
{path: "modifier-projet/habitant", component: HabitantProjetModificationComponent},
{path: "projet-publier", component: ProjetPublierComponent},
{ path: 'project-detail/:id', component: DetailProjetComponent },



/// Route admin

    { path: 'communes', component: ListCommuneComponent},
    {path: "dashboard-admin", component: DashboardAdminComponent},
    { path: 'communes/:id', component: ListCommuneComponent },
    { path: 'villes', component: VilleComponent },
    { path: 'roles', component: RolesComponent },

];
