import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {CandidatService} from "../../../Services/candidat.service";
import {RecruteurService} from "../../../Services/recruteur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-valider-suppression-profil',
  templateUrl: './valider-suppression-profil.component.html',
  styleUrls: ['./valider-suppression-profil.component.css']
})
export class ValiderSuppressionProfilComponent implements OnInit {

  constructor(private userAuthentificationService:UserAuthentificationService,
              private candidatService: CandidatService,
              private recruteurService: RecruteurService,
              private router: Router) { }

  private role: string = "";
  ngOnInit(): void {
    this.role = this.userAuthentificationService.getRole();
  }

  public deleteRecruteur(recruteurId: number): void{
    this.recruteurService.deleteRecruteur(recruteurId).subscribe(
        (response: void) => {
          this.userAuthentificationService.clear();
          this.router.navigate(['/offres'])
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }
  public deleteCandidat(candidatId: number): void{
    this.candidatService.deleteCandidat(candidatId).subscribe(
        (response: void) => {
          this.userAuthentificationService.clear();
          this.router.navigate(['/offres']);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public deleteAccount() {
    if (this.role == 'Recruteur'){
      this.deleteRecruteur(this.userAuthentificationService.getUserId())
    }
    else
      this.deleteCandidat(this.userAuthentificationService.getUserId());
  }

}
