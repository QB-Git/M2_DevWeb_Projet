import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Game } from '../Game';
import { FormatGameService } from '../service/format-game.service';
import { RestApiService } from '../service/rest-api.service';

@Component({
  selector: 'app-dialog-game',
  templateUrl: './dialog-game.component.html',
  styleUrls: ['./dialog-game.component.scss']
})
export class DialogGameComponent implements OnInit, OnChanges {
  @Input() game: Game;
  @Input() open: boolean = false;
  @Output('save') saveGame$: EventEmitter<any> = new EventEmitter();
  @Output('show') show$: EventEmitter<any> = new EventEmitter();

  listStatus: string[] = [];
  listPlateformes: string[] = [];
  listSupports: string[] = [];

  constructor(private restApi: RestApiService, public formatGame: FormatGameService) {
    this.game = {};
    this.restApi.getList('status').subscribe((data: string[]) => this.listStatus = data);
    this.restApi.getList('plateformes').subscribe((data: string[]) => this.listPlateformes = data);
    this.restApi.getList('supports').subscribe((data: string[]) => this.listSupports = data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['open'] != undefined)
      this.open = changes['open'].currentValue;
  }

  ngOnInit(): void {
  }

  onBasicUpload(event: any) {
    this.game.miniature = event.files[0];
  }

  hideDialog() {
    this.show$.emit(false);
  }

  saveGame() {
    this.saveGame$.emit();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
    this.hideDialog();
  }
}
