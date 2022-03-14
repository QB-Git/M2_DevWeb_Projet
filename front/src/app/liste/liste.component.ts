import { RestApiService } from './../partage/service/rest-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Game } from '../partage/Game';
import { SelectItem, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  @ViewChild('dialogRO') dialogRO: any;
  @ViewChild('dialog') dialog: any;

  games: any = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 1;

  sortField: string = "nom";

  sortKey!: string;

  game: Game = {};
  formData: FormData = new FormData();

  constructor(private restApi: RestApiService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.restApi.getGames().subscribe((data: {}) => this.games = data);

    this.sortOptions = [
      { label: 'A à Z (ordre alphabétique)', value: 'nom' },
      { label: 'Z à A (ordre anti-alphabétique) ', value: '!nom' }
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  newGame() {
    this.game = {};
    this.dialog.label = 'Ajout d\'un jeu';
    this.dialog.open = true;
  }

  editGame(game: Game) {
    this.game = { ...game };
    this.dialog.label = 'Modification d\'un jeu';
    this.dialog.open = true;
  }

  seeGame(game: Game) {
    this.game = { ...game };
    this.dialogRO.open = true;
  }

  private afterSaveGame(message: string) {
    this.games = [...this.games];
    this.dialog.open = false;
    this.game = {};
    this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: message, life: 3000 })
  }

  saveGame(game: any) {
    if (this.game.nom?.trim()) {
      if (this.game._id) {
        // UPDATE
        const id = this.findIndexById(this.game._id);
        this.restApi.updateGame(game._id, game).subscribe((data: {}) => {
          this.games[id] = data;
          this.afterSaveGame('Jeu mis à jour');
        });
      }
      else {
        // CREATE
        this.restApi.createGame(game).subscribe((data: {}) => {
          this.games.push(data);
          this.afterSaveGame('Jeu ajouté');
        });
      }
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  deleteGame(game: Game) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer <b>' + game.nom + '</b> ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Oui",
      rejectLabel: "Non",
      accept: () => {
        this.restApi.deleteGame(game._id).subscribe((data: {}) => {
          this.games = this.games.filter((g: any) => g._id !== game._id);
          this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Jeu supprimé', life: 3000 });
        });
      }
    });
  }
}

