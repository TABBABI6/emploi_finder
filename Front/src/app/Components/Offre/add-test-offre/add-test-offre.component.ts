import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TestNiveauService} from "../../../Services/test-niveau.service";
import {Offres} from "../../../Entity/Offres";
import {HttpErrorResponse} from "@angular/common/http";
import {RecruteurService} from "../../../Services/recruteur.service";
import {Recruteur} from "../../../Entity/Recruteur";
import {TestNiveau} from "../../../Entity/TestNiveau";

@Component({
  selector: 'app-add-test-offre',
  templateUrl: './add-test-offre.component.html',
  styleUrls: ['./add-test-offre.component.css']
})
export class AddTestOffreComponent implements OnInit {

  public mesTests: TestNiveau[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private testNiveauService: TestNiveauService,
              private recruteurService:RecruteurService) { }

  ngOnInit(): void {
    this.getRecruteur();
  }

  public getRecruteur() {
    this.recruteurService.findRecruteurtById(this.data.idRecruteur).subscribe(
        (response: Recruteur) => {
          this.mesTests = response.testNiveaus;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }


  public addTestToOffre(idoffre: number, idtest: number) {
    this.testNiveauService.addTestToOffre(idoffre,idtest).subscribe(
        (response: Offres) => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }
}
