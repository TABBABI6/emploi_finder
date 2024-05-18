import { Component, OnInit } from '@angular/core';
import {OffrePublicService} from "../../../Services/offre-public.service";
import {HttpErrorResponse} from "@angular/common/http";
import {OffresPublic} from "../../../Entity/OffresPublic";


@Component({
  selector: 'app-afficher-offres-linkedin',
  templateUrl: './afficher-offres-linkedin.component.html',
  styleUrls: ['./afficher-offres-linkedin.component.css']
})
export class AfficherOffresLinkedinComponent implements OnInit {

  centered = false;
  unbounded = false;
  checked = false;
  disabled = false;
  public OffresPublic: OffresPublic[] = [];
  constructor(private offrePublicService: OffrePublicService) {}


  p: number = 1;

  public erreure: string = "";

  ngOnInit(): void {
    this.getOffresPublic();
  }

  public getOffresPublic(): void{
    this.offrePublicService.getOffresLikedin()
        .subscribe(
            (responce:OffresPublic[]) => {
              this.OffresPublic = responce;
            },
            (error: HttpErrorResponse) => {
              this.erreure = "Erreure lors de chargement"
            });
  }

  public visiter(url: string){
    window.open(url);
  }
}
