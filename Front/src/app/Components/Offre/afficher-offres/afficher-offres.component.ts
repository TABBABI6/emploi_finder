import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {RecruteurService} from "../../../Services/recruteur.service";
import {Recruteur} from "../../../Entity/Recruteur";
import {Offres} from "../../../Entity/Offres";
import {debounceTime, distinctUntilChanged, map , Observable, OperatorFunction} from "rxjs";
import {ImageService} from "../../../Services/image.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {OffresPublic} from "../../../Entity/OffresPublic";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {OffreService} from "../../../Services/offre.service";


@Component({
  selector: 'app-afficher-offres',
  templateUrl: './afficher-offres.component.html',
  styleUrls: ['./afficher-offres.component.css']
})
export class AfficherOffresComponent implements OnInit {


    active = 1;
    page = 1;
    isDisabled = false;

    public offresTitres: string[] = [];
    public offresLieu: string[] = [];
    public titre= "";
    public lieu= "";
    public domaine= "";

    formatter = (result: string) => result.toUpperCase();

    searchbytitre: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) =>
                term === '' ? [] : this.offresTitres.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
            ),
        );

    searchbylieu: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) =>
                term === '' ? [] : this.offresLieu.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
            ),
        );
    centered = false;
    unbounded = false;
    checked = false;
    disabled = false;
    public filtrer = false;
    public recherche = false;
    public rechercheParTitre = false;
    public rechercheParLieu = false;
    public rechercheParDomaine = false;
    public aucuneOffre = false;
    public OffresPublic: OffresPublic[] = [];
    p: number = 1;
    role = "";
  public Offres = new Map<Offres,Recruteur>;
  constructor(private recruteurService: RecruteurService,
              private imageService: ImageService,
              private router: Router,
              private userAuthentificationService: UserAuthentificationService,
              private offreService: OffreService) { }

  ngOnInit(): void {
    this.getRecruteurs();
    this.role = this.userAuthentificationService.getRole();
  }


  public rechercheByDomaine(){
      this.rechercheParDomaine = !this.rechercheParDomaine;
  }
  public rechercheByTitre(){
      this.rechercheParTitre = ! this.rechercheParTitre;
  }
    public rechercheByLieu(){
        this.rechercheParLieu = ! this.rechercheParLieu;
    }
  public activerRecherche(){
      this.recherche = !this.recherche;
  }

    public desactiverRecherche(){
        this.recherche = !this.recherche;
        window.location.reload();
    }

  public getRecruteurs(): void{
    this.recruteurService.getRecruteurs()
        .pipe(
            map((x: any[], i) => x.map((recruteur: Recruteur) => this.imageService.createImage(recruteur)))
    )
        .subscribe(
        (responce:Recruteur[]) => {
            for (let rec of responce){
                for (let ofr of rec.offres){
                    if (Number(ofr)){
                        this.offreService.findOffreById(ofr).subscribe(
                            (responce: Offres)=>{
                                this.Offres.set(responce,rec);
                                this.offresTitres.push(responce.titre);
                                this.offresLieu.push(responce.lieu)
                            },(error: HttpErrorResponse)=>{
                                alert(error.message);
                            }
                        );
                    }
                    else {
                        this.Offres.set(ofr,rec);
                        this.offresTitres.push(ofr.titre);
                        this.offresLieu.push(ofr.lieu)
                    }
                }
            }
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        });
  }

  public getDetails(idO: number, idR: number) {
      this.router.navigate(['/detailOffre'], { queryParams: { idO: idO , idR: idR} });
  }

    public chercher(addForm: NgForm) {
        this.recruteurService.getRecruteurs()
            .pipe(
                map((x: any[], i) => x.map((offre: Offres) => this.imageService.createImage(offre)))
            )
            .subscribe(
                (responce:Recruteur[]) => {
                    this.Offres.clear();
                    if (this.rechercheParTitre && !this.rechercheParLieu && !this.rechercheParDomaine)
                    {
                        for (let rec of responce){
                            for (let ofr of rec.offres) {
                                if (ofr.titre.toUpperCase() == this.titre.toUpperCase())
                                    this.Offres.set(ofr,rec);
                            }
                        }
                    }
                    else if (!this.rechercheParTitre && this.rechercheParLieu && !this.rechercheParDomaine)
                    {
                        for (let rec of responce){
                            for (let ofr of rec.offres) {
                                if (ofr.lieu.toUpperCase() == this.lieu.toUpperCase())
                                    this.Offres.set(ofr,rec);
                            }
                        }
                    }
                    else if (!this.rechercheParTitre && !this.rechercheParLieu && this.rechercheParDomaine)
                    {
                        for (let rec of responce){
                            for (let ofr of rec.offres) {
                                if (ofr.domaine == this.domaine)
                                    this.Offres.set(ofr,rec);
                            }
                        }
                    }
                    else if(this.rechercheParTitre && this.rechercheParLieu && !this.rechercheParDomaine)
                    {
                        for (let rec of responce) {
                            for (let ofr of rec.offres) {
                                if (ofr.lieu == this.lieu && ofr.titre == this.titre)
                                    this.Offres.set(ofr, rec);
                            }
                        }
                    }
                    else if(!this.rechercheParTitre && this.rechercheParLieu && this.rechercheParDomaine)
                    {
                        for (let rec of responce) {
                            for (let ofr of rec.offres) {
                                if (ofr.lieu == this.lieu && ofr.domaine == this.domaine)
                                    this.Offres.set(ofr, rec);
                            }
                        }
                    }
                    else if(this.rechercheParTitre && !this.rechercheParLieu && this.rechercheParDomaine)
                    {
                        for (let rec of responce) {
                            for (let ofr of rec.offres) {
                                if (ofr.domaine == this.domaine && ofr.titre == this.titre)
                                    this.Offres.set(ofr, rec);
                            }
                        }
                    }
                    else if(this.rechercheParTitre && this.rechercheParLieu && this.rechercheParDomaine)
                    {
                        for (let rec of responce) {
                            for (let ofr of rec.offres) {
                                if (ofr.lieu == this.lieu && ofr.titre == this.titre && ofr.domaine == this.domaine)
                                    this.Offres.set(ofr, rec);
                            }
                        }
                    }
                    this.filtrer = true;
                    if (this.Offres.size == 0){
                        this.aucuneOffre = true
                    }
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                });
    }
}
