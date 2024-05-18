import {Component, Inject, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {RecruteurService} from "../../../Services/recruteur.service";
import {CandidatService} from "../../../Services/candidat.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-valider-suppression-user',
  templateUrl: './valider-suppression-user.component.html',
  styleUrls: ['./valider-suppression-user.component.css']
})
export class ValiderSuppressionUserComponent implements OnInit {

  constructor(private recruteurService:RecruteurService,
              private candidatService: CandidatService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }


  public deleteRecruteur(recruteurId: number): void{
    this.recruteurService.deleteRecruteur(recruteurId).subscribe(
        (response: void) => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }
  public deleteCandidat(candidatId: number): void{
    this.candidatService.deleteCandidat(candidatId).subscribe(
        (response: void) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

    public deleteAccount(role: string, id: number) {
        if (role == 'Recruteur'){
            this.deleteRecruteur(id)
        }
        else
            this.deleteCandidat(id);
    }

}
