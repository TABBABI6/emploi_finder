import { Component, OnInit } from '@angular/core';
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {CandidatService} from "../../../Services/candidat.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageService} from "../../../Services/image.service";
import {MatDialog} from "@angular/material/dialog";
import {ModifierDonneesComponent} from "../modifier-donnees/modifier-donnees.component";
import {RecruteurService} from "../../../Services/recruteur.service";
import {ActivatedRoute} from "@angular/router";
import {ValiderSuppressionProfilComponent} from "../valider-suppression-profil/valider-suppression-profil.component";
import {Image} from "../../../Entity/image";
import {Recruteur} from "../../../Entity/Recruteur";
import {Candidat} from "../../../Entity/Candidat";
import {map} from "rxjs";
import {NotificationService} from "../../../Services/notification.service";
import {Notification} from "../../../Entity/Notification";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public user: any={
      nom: "",
      prenom: "",
      mdp: "",
      mail: "",
      adresse: "",
      date_naissance: "",
      image: {
          file : new File([],""),
          url : ""
      },
      role: "",
      id: 0,
      offres: [],
      num_tel: 0,
      fonction: "",
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
      mailNotifications: true
  }
  public role: string = "";
  public idUser = 0;
  public idUserConnecte = 0;
  public imageId: number = 0;
  public cvId: number = 0;
  public LmId: number = 0;
    centered = false;
    unbounded = false;
    disabled = false;
    roleUserConnecte = "";
    isChecked: any;
    public notifications: Notification[]= [];

  constructor(private userAuthentificationService:UserAuthentificationService,
              private candidatService: CandidatService,
              private recruteurService: RecruteurService,
              private imageService: ImageService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
      this.route.queryParams
          .subscribe(params => {
              this.idUser = params['id']});
      this.getUserImageId();
      this.getUser();
      this.idUserConnecte = this.userAuthentificationService.getUserId();
      if (this.userAuthentificationService.getRole()=='Condidat'){
          this.getUserCvLmId();
      }
      this.roleUserConnecte = this.userAuthentificationService.getRole();
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

    openDialog() {
        this.dialog.open(ModifierDonneesComponent);
    }

    public getUser(): void{
        this.userAuthentificationService.findUserById(this.idUser)
            .pipe(map(p => this.imageService.createImage(p)))
            .subscribe(
            (responce:any) => {
                this.user = responce;
                this.role = responce.role;

                if (this.user.role == 'Condidat'){
                    if (this.user.cv){
                        this.imageService.createCv(this.user);
                    }
                    if (this.user.lettre_motivation) {
                        this.imageService.createLm(this.user);
                    }
                }
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }



    public validerSuppressionProfil() {
        this.dialog.open(ValiderSuppressionProfilComponent)
    }


    public updateUserImage(user: any): void{
        const userFormData = this.prepareFormData(this.user)
        if (this.role == 'Recruteur')
            this.recruteurService.updateRecruteurImage(userFormData).subscribe(
                (response: Recruteur) => {
                    this.deleteImage(this.imageId);
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
        else
            this.candidatService.updateCandidatImage(userFormData).subscribe(
                (response: Candidat) => {
                    this.deleteImage(this.imageId);
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
    }

    public updateCandidatCV(): void{
        const userFormData = this.prepareFormDataCv(this.user)
        this.candidatService.updateCandidatCV(userFormData).subscribe(
            (response: Candidat) => {
                this.deleteImage(this.cvId);
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public updateCandidatLm(): void{
        const userFormData = this.prepareFormDataLm(this.user)
        this.candidatService.updateCandidatLM(userFormData).subscribe(
            (response: Candidat) => {
                this.deleteImage(this.LmId);
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    prepareFormDataCv(candidat: Candidat): FormData{
        const formData = new FormData();
        formData.append(
            'user',
            new Blob([JSON.stringify(candidat)], {type: 'application/json'})
        );
        formData.append(
            'cv',
            candidat.cv.file,
            candidat.cv.file.name
        );
        return formData;
    }

    prepareFormDataLm(candidat: Candidat): FormData{
        const formData = new FormData();
        formData.append(
            'user',
            new Blob([JSON.stringify(candidat)], {type: 'application/json'})
        );
        formData.append(
            'lm',
            candidat.lettre_motivation.file,
            candidat.lettre_motivation.file.name
        );
        return formData;
    }

    prepareFormData(recruteur: Recruteur): FormData{
        const formData = new FormData();
        formData.append(
            'user',
            new Blob([JSON.stringify(recruteur)], {type: 'application/json'})
        );
        formData.append(
            'imageFile',
            recruteur.image.file,
            recruteur.image.file.name
        );
        return formData;
    }


    updateCv(event: any){
        if (event.target.files){
            const file = event.target.files[0];

            const image: Image = {
                file: file,
                // @ts-ignore
                url: null
            }
            this.user.cv=image;
        }
        this.updateCandidatCV();
    }

    updateLm(event: any){
        if (event.target.files){
            const file = event.target.files[0];

            const image: Image = {
                file: file,
                // @ts-ignore
                url: null
            }
            this.user.lettre_motivation=image;
        }
        this.updateCandidatLm();
    }

    addCv(event: any){
        if (event.target.files){
            const file = event.target.files[0];

            const image: Image = {
                file: file,
                // @ts-ignore
                url: null
            }
            this.user.cv=image;
        }
        this.addCandidatCV();
    }

    addLettreMotivation(event: any){
        if (event.target.files){
            const file = event.target.files[0];

            const image: Image = {
                file: file,
                // @ts-ignore
                url: null
            }
            this.user.lettre_motivation=image;
        }
        this.addCandidatLettreMotivation();
    }

    public addCandidatLettreMotivation(): void{
        const userFormData = this.prepareFormDataLm(this.user)
        this.candidatService.updateCandidatLM(userFormData).subscribe(
            (response: Candidat) => {
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public addCandidatCV(): void{
        const userFormData = this.prepareFormDataCv(this.user)
        this.candidatService.updateCandidatCV(userFormData).subscribe(
            (response: Candidat) => {
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }


    onFileSelected(event: any){
        if (event.target.files){
            const file = event.target.files[0];

            const image: Image = {
                file: file,
                // @ts-ignore
                url: null
            }
            this.user.image=image;
        }
        this.updateUserImage(this.user);
    }


    public getUserImageId(): void{
        this.userAuthentificationService.findUserById(this.idUser)
            .subscribe(
                (responce:any) => {
                    this.imageId = responce.image.id
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
    }

    public getUserCvLmId(): void{
        this.userAuthentificationService.findUserById(this.idUser)
            .subscribe(
                (responce:any) => {
                    this.cvId = responce.cv.id;
                    this.LmId = responce.lettre_motivation.id;
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
    }
    public deleteImage(imageId: number): void{
        this.imageService.deleteImage(imageId).subscribe(
            (response: void) => {
                window.location.reload()
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }


    ouvrirPdf(url: any) {
        window.open(url)
    }


    public notificationUpdate(): void{
        this.candidatService.notificationUpdate(this.idUser)
            .subscribe(
                (responce:any) => {
                   window.location.reload();
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
    }
}
