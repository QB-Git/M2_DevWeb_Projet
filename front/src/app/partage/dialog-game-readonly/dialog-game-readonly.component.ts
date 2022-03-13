import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../Game';
import { FormatGameService } from '../service/format-game.service';

@Component({
  selector: 'app-dialog-game-readonly',
  templateUrl: './dialog-game-readonly.component.html',
  styleUrls: ['./dialog-game-readonly.component.scss']
})
export class DialogGameReadonlyComponent implements OnInit {
  open: boolean = false;
  @Input() game: Game;

  constructor(public formatGame: FormatGameService) {
    this.game = {};
  }

  ngOnInit(): void {
  }
}
