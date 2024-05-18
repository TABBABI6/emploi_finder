import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-offres-rechercher',
  templateUrl: './offres-rechercher.component.html',
  styleUrls: ['./offres-rechercher.component.css']
})

export class OffresRechercherComponent implements OnInit {
  @Input() item = '';
  constructor() { }

  ngOnInit(): void {
  }

}
