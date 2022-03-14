import { Game } from './../Game';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormatGameService } from '../service/format-game.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  /**
   * Composant carte (utilisé dans app-liste)
   * Permet d'afficher les informations d'un jeu et d'opérer des actions dessus
   */

  // Le jeu passé en paramètre
  @Input() game: Game;

  // L'ensemble des actions que l'on fait remonter au parent
  @Output('gameDelete') delete$: EventEmitter<any> = new EventEmitter();
  @Output('gameUpdate') update$: EventEmitter<any> = new EventEmitter();
  @Output('deleteGame') deleteGame$: EventEmitter<any> = new EventEmitter();
  @Output('editGame') editGame$: EventEmitter<any> = new EventEmitter();
  @Output('seeGame') seeGame$: EventEmitter<any> = new EventEmitter();

  constructor(public formatGame: FormatGameService, ) {
    this.game = {};
  }

  ngOnInit(): void {
  }

  delete() {
    this.delete$.emit(this.game);
  }

  update() {
    this.update$.emit();
  }

  btnDeleteGame() {
    this.deleteGame$.emit(this.game);
  }

  btnUpdateGame() {
    this.editGame$.emit(this.game);
  }

  btnSeeGame() {
    this.seeGame$.emit(this.game);
  }
}
