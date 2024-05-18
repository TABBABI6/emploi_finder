import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {ArticleService} from "../../../Services/article-service.service";

@Component({
  selector: 'app-supprimer-article',
  templateUrl: './supprimer-article.component.html',
  styleUrls: ['./supprimer-article.component.css']
})
export class SupprimerArticleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private articleService:ArticleService) { }

  ngOnInit(): void {
  }

  public deleteArticle(articleId: number): void{
    this.articleService.deleteArticle(articleId).subscribe(
        (response: void) => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }
}
