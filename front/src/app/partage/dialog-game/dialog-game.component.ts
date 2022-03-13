import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
  @Output('save') saveGame$: EventEmitter<any> = new EventEmitter();
  @ViewChild('upFile') upFile: any;

  label: string;
  open: boolean = false;

  listStatus: string[] = [];
  listPlateformes: object[] = [];
  listSupports: object[] = [];

  tempMiniature: any | undefined;

  constructor(private restApi: RestApiService, public formatGame: FormatGameService) {
    this.game = {};
    this.label = '';
    this.restApi.getList('status').subscribe((data: string[]) => this.listStatus = data);
    this.restApi.getList('plateformes').subscribe((data: string[]) => {
      data.forEach(p => this.listPlateformes.push({name: p}))
    });
    this.restApi.getList('supports').subscribe((data: string[]) => {
      data.forEach(p => this.listSupports.push({name: p}))
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['open'] != undefined)
      this.open = changes['open'].currentValue;
  }

  ngOnInit(): void {}

  uploadMiniature(event: any) {
    this.tempMiniature = event.currentFiles[0];
    this.upFile.showCancelButton = true;
  }

  removeMiniature(event: any) {
    this.tempMiniature = undefined;
    this.upFile.showCancelButton = false;
  }

  hideDialog() {
    this.tempMiniature = undefined;
    this.open = false;
  }

  saveGame() {
    this.game.miniature = this.tempMiniature;
    this.saveGame$.emit(this.game);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.hideDialog();
  }
}
