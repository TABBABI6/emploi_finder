import {Component, Inject, OnInit} from '@angular/core';
import {Candidat} from "../../../Entity/Candidat";
import {HttpErrorResponse} from "@angular/common/http";
import {CandidatService} from "../../../Services/candidat.service";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PostulationService} from "../../../Services/postulation.service";

@Component({
  selector: 'app-valider-suppression-postulation',
  templateUrl: './valider-suppression-postulation.component.html',
  styleUrls: ['./valider-suppression-postulation.component.css']
})
export class ValiderSuppressionPostulationComponent implements OnInit {

  public candidat: Candidat={
      id:0,
    nom: "",
    prenom: "",
    mdp: "",
    mail: "",
    adresse: "",
    date_naissance: "",
    fonction: "",
    image: {
      file : new File([],""),
      url : ""
    },
    cv: {
      file: new File([], ""),
      url: ""
    },
    lettre_motivation: {
      file: new File([], ""),
      url: ""
    },
    competances: [],
    formations: [],
    postulations: []
  }

  constructor(private candidatService: CandidatService,
              private userAuthentificationService: UserAuthentificationService,
              private postulationService: PostulationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }


  public deletePostulation(): void{
    this.postulationService.deletePostulation(this.data.id)
        .subscribe(
            (responce:void) => {
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
  }

}
