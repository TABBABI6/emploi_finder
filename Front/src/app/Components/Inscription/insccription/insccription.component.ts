import { Component, OnInit } from '@angular/core';
import {Candidat} from "../../../Entity/Candidat";

@Component({
  selector: 'app-insccription',
  templateUrl: './insccription.component.html',
  styleUrls: ['./insccription.component.css']
})
export class InsccriptionComponent implements OnInit {

  constructor() { }

    public inscrit: string = "";

  ngOnInit(): void {}

    public incritCandidat(){
      this.inscrit = 'Candidat';
    }
    public inscritRecruteur(){
      this.inscrit = 'Recruteur';
    }
}
