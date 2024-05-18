import { Component, OnInit } from '@angular/core';
import {OffrePublicService} from "../../../Services/offre-public.service";
import {HttpErrorResponse} from "@angular/common/http";
import {OffresPublic} from "../../../Entity/OffresPublic";

@Component({
  selector: 'app-afficher-offres-option-carrier',
  templateUrl: './afficher-offres-option-carrier.component.html',
  styleUrls: ['./afficher-offres-option-carrier.component.css']
})
export class AfficherOffresOptionCarrierComponent implements OnInit {

  centered = false;
  unbounded = false;
  checked = false;
  disabled = false;
  public OffresPublic: OffresPublic[] = [];
  constructor(private offrePublicService: OffrePublicService) {}


  p: number = 1;


  ngOnInit(): void {
    this.getOffresPublic();
  }

  public getOffresPublic(): void{
    this.offrePublicService.getOffresOptioncarrier()
        .subscribe(
            (responce:OffresPublic[]) => {
              this.OffresPublic = responce
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            });
  }

  public visiter(url: string){
    window.open(url);
  }

}
