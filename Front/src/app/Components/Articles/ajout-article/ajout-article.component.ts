import { Component, OnInit } from '@angular/core';
import {Article} from "../../../Entity/Article";
import {Image} from "../../../Entity/image";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {map} from "rxjs";
import {ImageService} from "../../../Services/image.service";
import {ArticleService} from "../../../Services/article-service.service";
import {ModifierArticleComponent} from "../modifier-article/modifier-article.component";
import {SupprimerArticleComponent} from "../supprimer-article/supprimer-article.component";


@Component({
  selector: 'app-ajout-article',
  templateUrl: './ajout-article.component.html',
  styleUrls: ['./ajout-article.component.css'],
  providers: [DatePipe]

})
export class AjoutArticleComponent implements OnInit {
  myDate = new Date();
  date: any;
  disabled = false;
  articles:Article[]=[];
  public article: Article = {
    id: 0,
    titre: "",
    date_creation: "",
    description: "",
    sous_titre1: "",
    description1: "",
    sous_titre2: "",
    description2: "",
    sous_titre3: "",
    description3: "",
    sous_titre4: "",
    description4: "",
    sous_titre5: "",
    description5: "",
    image: {
      file: new File([], ""),
      url: ""
    },
  }
  public addarticle: boolean = false;
  constructor(private articleService:ArticleService,
              private  router:Router,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private imageService: ImageService
  ) {
    this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.getAllArticle();
  }

  public addArticle(addForm: NgForm) {
    this.article.date_creation=this.date;
    console.log(this.article)
    const articleFormData = this.prepareFormData(this.article)
    this.articleService.addArticle(articleFormData).subscribe(
        (response: Article) => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }
  ajoutArticle() {
    this.addarticle = !this.addarticle;
  }
  public getDetails(id: number) {
    this.router.navigate(['/detail-article'],{ queryParams: { id:id} });
    setTimeout(function(){
      window.location.reload();
    }, 1);
  }


  public validerSuppression(idArticle: number){
    this.dialog.open(SupprimerArticleComponent, {
      data:{
        id: idArticle
      },
    })
  }

  public modifier(idArticle: number){
    this.dialog.open(ModifierArticleComponent, {
      width: "800",
      height: "90vh",
      data:{
        id: idArticle
      },
    })
  }

  prepareFormData(article: Article): FormData{
    const formData = new FormData();
    formData.append(
        'article',
        new Blob([JSON.stringify(article)], {type: 'application/json'})
    );
    formData.append(
        'imageFile',
        article.image.file,
        article.image.file.name
    );
    return formData;
  }
  onFileSelected(event: any){
    if (event.target.files){
      const file = event.target.files[0];

      const image: Image = {
        file: file,
        // @ts-ignore
        url: null
      }
      this.article.image=image;
    }
  }

  public getAllArticle() {
    this.articleService.getAllArticle()
        .pipe(
            map((x: any[], i) => x.map((article: Article) => this.imageService.createImage(article)))
        ).subscribe(
        (response: Article[]) => {
          this.articles =response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }
}


