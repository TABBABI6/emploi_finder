import {Component, Inject, OnInit} from '@angular/core';
import {Article} from "../../../Entity/Article";
import {ArticleService} from "../../../Services/article-service.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-modifier-article',
  templateUrl: './modifier-article.component.html',
  styleUrls: ['./modifier-article.component.css']
})
export class ModifierArticleComponent implements OnInit {

  constructor(private articlesService:ArticleService,
              @Inject(MAT_DIALOG_DATA) public data: any)
  {
  }


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

  ngOnInit(): void {
    this.findArticle(this.data.id);
  }

  public findArticle(articleId: number): void{
    console.log(articleId)
    this.articlesService.findArticleById(articleId).subscribe(
        (responce: Article) => {
          this.article = responce;
          console.log(this.article)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    )
  }



  public updateArticle(articles: Article): void{
    this.articlesService.updateArticle(articles).subscribe(
        (response: Article) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }


}
