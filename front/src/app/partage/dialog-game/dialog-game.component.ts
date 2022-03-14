import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Game } from '../Game';
import { FormatGameService } from '../service/format-game.service';
import { RestApiService } from '../service/rest-api.service';

@Component({
  selector: 'app-dialog-game',
  templateUrl: './dialog-game.component.html',
  styleUrls: ['./dialog-game.component.scss']
})
export class DialogGameComponent implements OnInit {
  /**
   * Il s'agit de la fenêtre appelé pour créer ou mettre à jour un jeu
   */

  // Le jeu courant passé en paramètre
  @Input() game: Game;
  // On emmet un évènement quand on veut sauvegarder le jeu
  @Output('save') saveGame$: EventEmitter<any> = new EventEmitter();
  // Permet d'accéder aux méthodes relatives à l'upload
  @ViewChild('upFile') upFile: any;

  // Paramètres variables, changés depuis le parent grâce à un ViewChild
  label: string = '';
  open: boolean = false;

  // Les liste de status, plateformes et supports
  listStatus: string[] = [];
  listPlateformes: object[] = [];
  listSupports: object[] = [];

  // Permet de stocker temporairement la miniature durant la saisie (pour ne pas écraser l'actuelle)
  tempMiniature: any | undefined;

  constructor(private restApi: RestApiService, public formatGame: FormatGameService) {
    this.game = {};
    // On récupère les trois listes
    this.restApi.getList('status').subscribe((data: string[]) => this.listStatus = data);
    this.restApi.getList('plateformes').subscribe((data: string[]) => {
      data.forEach(p => this.listPlateformes.push({ name: p }))
    });
    this.restApi.getList('supports').subscribe((data: string[]) => {
      data.forEach(p => this.listSupports.push({ name: p }))
    });
  }

  ngOnInit(): void {
  }

  // Permet de sauvegarder le fichier uploadé
  uploadMiniature(event: any) {
    this.tempMiniature = event.currentFiles[0];
    this.upFile.showCancelButton = true;
  }

  // On ennlève le fichier uploadé
  removeMiniature(event: any) {
    this.tempMiniature = undefined;
    this.upFile.showCancelButton = false;
  }

  // Permeyt de fermer la fenêtre modal
  hideDialog() {
    this.tempMiniature = undefined;
    this.open = false;
  }

  // On assigne définitivement la miniature et on enregstre le jeu
  saveGame() {
    this.game.miniature = this.tempMiniature;
    this.saveGame$.emit(this.game);
  }
}
