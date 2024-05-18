import { Component, OnInit } from '@angular/core';
import {Offres} from "../../../Entity/Offres";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {OffreService} from "../../../Services/offre.service";
import {RecruteurService} from "../../../Services/recruteur.service";
import {Recruteur} from "../../../Entity/Recruteur";
import {MatDialog} from "@angular/material/dialog";
import {ValiderSuppressionComponent} from "../valider-suppression/valider-suppression.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ModifierOffreComponent} from "../modifier-offre/modifier-offre.component";
import {DatePipe} from "@angular/common";
import {CandidatService} from "../../../Services/candidat.service";
import {Candidat} from "../../../Entity/Candidat";
import {AddTestOffreComponent} from "../add-test-offre/add-test-offre.component";
import {NotificationService} from "../../../Services/notification.service";
@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css'],
    providers: [DatePipe]
})
export class OffresComponent implements OnInit {

    centered = false;
    disabled = false;

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

    public addoffre: boolean = false;
    public recruteurOfres: Offres[] = [];
    public idUser = 0;
    private idUserConnecte = 0;
    public recruteur!: Recruteur;
    myDate = new Date();
    date: any;
    p: number = 1;
      constructor(private userAuthentificationService:UserAuthentificationService,
                  private offreService: OffreService,
                  private recruteurService: RecruteurService,
                  public dialog: MatDialog,
                  private route: ActivatedRoute,
                  private router: Router,
                  private datePipe: DatePipe,
                  private candidatService: CandidatService,
                  private notificationService: NotificationService){
          this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      }



      ngOnInit(): void {
          this.route.queryParams
              .subscribe(params => {
                  this.idUser = params['id']});
          this.idUserConnecte = this.userAuthentificationService.getUserId();
        this.getUser();
      }

    public isLogedIn(){
        return this.userAuthentificationService.isLoggedIn();
    }
    public proprietaireCompte(){
        if (this.idUser == this.idUserConnecte)
            return true;
        else
            return false;
    }

      public validerSuppression(idOffre: number){
          this.dialog.open(ValiderSuppressionComponent, {
              data:{
                  id: idOffre
              },
          })
      }

      public getUser(): void{
        this.recruteurService.findRecruteurtById(this.idUser)
            .subscribe(
                (responce:Recruteur) => {
                  for (let offre of responce.offres){
                      if (Number(offre)){
                          this.offreService.findOffreById(offre).subscribe(
                              (responce: Offres)=>{
                                  this.recruteurOfres.push(responce)

                              },(error: HttpErrorResponse)=>{
                                  alert(error.message);
                              }
                          );
                      }else {
                          this.recruteurOfres.push(offre)
                      }
                  }
                  this.recruteur = responce;
                },
                (error: HttpErrorResponse) => {
                  alert(error.message);
                }
            );
      }

      public addOffres(addForm: NgForm) {
          this.offre.date_ajout = this.date;
        this.offreService.addOffre(this.offre).subscribe(
            (response: Offres) => {
              this.addOffreToRecruteur(this.userAuthentificationService.getUserId(), response.id)
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
      }
      public addOffreToRecruteur(recruteurId: number, offreId: number): void{
        this.offreService.addOffreToRecruteur(recruteurId,offreId).subscribe(
            (response: void) => {
                this.sendMail(offreId);
                this.sendNotification(offreId);
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

    ajoutOffre() {
        this.addoffre = !this.addoffre;
      }

    public getDetails(idO: number, idR: number) {
        this.router.navigate(['/detailOffre'], { queryParams: { idO: idO , idR: idR} });
    }

    public modifier(idOffre: number){
        this.dialog.open(ModifierOffreComponent, {
            width: "800px",
            height: "90vh",
            data:{
                id: idOffre
            },
        })
    }

    public addTestToOffre(idOffre: number){
        this.dialog.open(AddTestOffreComponent, {
            data:{
                idoffre: idOffre,
                idRecruteur: this.recruteur.id
            },
        })
    }


    public deleteTestFromOffre(offreId: number, testId: number): void{
        this.offreService.removeTestFromOffre(offreId, testId).subscribe(
            (response: any) => {
                window.location.reload()
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

}
