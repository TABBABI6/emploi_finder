import {Component, Inject, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {OffreService} from "../../../Services/offre.service";
import {Offres} from "../../../Entity/Offres";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Candidat} from "../../../Entity/Candidat";
import {CandidatService} from "../../../Services/candidat.service";
import {NotificationService} from "../../../Services/notification.service";

@Component({
  selector: 'app-modifier-offre',
  templateUrl: './modifier-offre.component.html',
  styleUrls: ['./modifier-offre.component.css']
})
export class ModifierOffreComponent implements OnInit {

  constructor(private offreService: OffreService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private candidatService: CandidatService,
              private notificationService:NotificationService) { }

    public offre: Offres = {
        id: 0,
        titre: "",
        date_ajout: "",
        date_expiration: "",
        description: "",
        domaine: "",
        type_poste: "",
        lieu: "",
        experience: "",
        etude: "",
        salaire: 0,
        disponibilite: "",
        postulations: [],
        testNiveaus:[]
    }
  ngOnInit(): void {
      this.findOffre(this.data.id);
  }

  public findOffre(offreId: number): void{
    this.offreService.findOffreById(offreId).subscribe(
        (responce: Offres) => {
          this.offre = responce;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    )
  }

  public updateOffre(offres: Offres): void{
    this.offreService.updateOffre(offres).subscribe(
        (response: Offres) => {
            this.sendMail(offres.id);
            this.sendNotification(offres.id);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }


    public sendMail(offreId: number): void{
        this.candidatService.mailsender(offreId).subscribe(
            (response: Candidat) => {

            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public sendNotification(offreId: number): void{
        this.notificationService.sendNotification(offreId).subscribe(
            (response: any) => {
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

}
