import { RestApiService } from './../partage/service/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Game } from '../partage/Game';
import { SelectItem, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  games: any = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = "";

  gameDialog: boolean = false;

  game: Game = {};
  formData: FormData = new FormData();

  constructor(private restApi: RestApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.restApi.getGames().subscribe((data: {}) => this.games = data);

    this.sortOptions = [
      // { label: 'Price High to Low', value: '!price' },
      // { label: 'Price Low to High', value: 'price' }
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
    this.gameDialog = true;
  }

  editGame(game: Game) {
    this.game = { ...game };
    this.gameDialog = true;
  }

  saveGame() {
    console.log(this.game);
    if (this.game.nom?.trim()) {
      if (this.game._id) {
        // UPDATE
        const id = this.findIndexById(this.game._id);
        this.restApi.updateGame(this.game._id, this.game).subscribe((data: {}) => {
          this.games[id] = data;
          this.games = [...this.games];
          this.gameDialog = false;
          this.game = {};
          this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Jeu mis à jour', life: 3000 });
        });
      }
      else {
        // CREATE
        this.restApi.createGame(this.game).subscribe((data: {}) => {
          this.games.push(data);
          this.gameDialog = false;
          this.game = {};
          this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Jeu ajouté', life: 3000 });
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

  showDialog(show: boolean) {
    this.gameDialog = show;
  }
}

