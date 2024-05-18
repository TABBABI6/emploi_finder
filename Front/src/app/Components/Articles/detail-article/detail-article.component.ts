import { Component, OnInit } from '@angular/core';
import {Article} from "../../../Entity/Article";
import {map} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../../Services/article-service.service";
import {ImageService} from "../../../Services/image.service";

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private imageService:ImageService) {
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
  private idA = 0;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idA = params['id']});
    this.getArticle();
  }

  public getArticle(): void {
    this.articleService.findArticleById(this.idA)
        .pipe(map(p => this.imageService.createImage(p)))
        .subscribe(
            (responce: Article) => {
              this.article = responce;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
  }

}
