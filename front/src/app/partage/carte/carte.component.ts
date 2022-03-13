import { Game } from './../Game';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormatGameService } from '../service/format-game.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {
  @Input() game: Game;

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
