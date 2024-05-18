import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./Components/Profiles/profile/profile.component";
import {AfficherOffresComponent} from "./Components/Offre/afficher-offres/afficher-offres.component";
import {DetailOffreComponent} from "./Components/Offre/detail-offre/detail-offre.component";
import {UtilisateursComponent} from "./Components/Admin/utilisateurs/utilisateurs.component";
import {StatistiquesComponent} from "./Components/Admin/Statis/statistiques/statistiques.component";
import {CvComponent} from "./Components/CV/cv/cv.component";
import {AideComponent} from "./Components/aide/aide.component";
import {AfficherTestComponent} from "./Components/TestNiveau/afficher-test/afficher-test.component";
import {AjoutArticleComponent} from "./Components/Articles/ajout-article/ajout-article.component";
import {DetailArticleComponent} from "./Components/Articles/detail-article/detail-article.component";
import {ContactComponent} from "./Components/Contacts/contact/contact.component";

const routes: Routes = [
  {path: 'profile', component:ProfileComponent},
  {path: 'offres', component:AfficherOffresComponent},
  {path: 'detailOffre', component:DetailOffreComponent},
  {path: 'users', component:UtilisateursComponent},
  {path: 'statistiques', component:StatistiquesComponent},
  {path: 'cv', component:CvComponent},
  {path: 'help', component:AideComponent},
  {path: 'test', component:AfficherTestComponent},
  {path: 'articles', component:AjoutArticleComponent},
  {path: 'detail-article', component:DetailArticleComponent},
  {path: 'contact', component:ContactComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
