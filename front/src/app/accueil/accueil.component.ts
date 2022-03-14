import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  /**
   * Composant permettant d'afficher une page d'accueil
   * Permet la redirection vers list et stats
   */
  constructor() { }

  ngOnInit(): void {
  }

}
