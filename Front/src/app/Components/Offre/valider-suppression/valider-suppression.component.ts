import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {OffreService} from "../../../Services/offre.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-valider-suppression',
  templateUrl: './valider-suppression.component.html',
  styleUrls: ['./valider-suppression.component.css']
})
export class ValiderSuppressionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private offreService: OffreService) { }

  ngOnInit(): void {
  }

  public deleteOffre(offreId: number): void{
    this.offreService.deleteOffre(offreId).subscribe(
        (response: void) => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

}
