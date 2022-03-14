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
  // Variable permettant de contrôler les 2 modal
  @ViewChild('dialogRO') dialogRO: any;
  @ViewChild('dialog') dialog: any;

  // Variable contenant l'ensemble des jeux chargés
  games: any = [];

  // Variables utilisés pour le tri / filtre
  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = '';
  sortKey!: string;

  // Variable correspondant au jeu courant
  game: Game = {};

  // On va avoir besoin ici de 3 services
  // - restApi pour les appels à l'api
  // - messageService pour les messages de validation
  // - confirmationService pour les fenêtre dialog
  constructor(private restApi: RestApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    // On récupère l'ensemble des jeux
    this.restApi.getGames().subscribe((data: {}) => {
      this.games = data;
      // On initialise le tri à A-Z
      this.sortKey = "nom";
      this.sortOrder = 1;
      this.sortField = this.sortKey;
    });

    // On initialise les tris disponibles
    this.sortOptions = [
      { label: 'A à Z (ordre alphabétique)', value: 'nom' },
      { label: 'Z à A (ordre anti-alphabétique) ', value: '!nom' }
    ];
  }

  // Mise à jour du tri
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

  // Permet d'ouvrir app-dialog-game pour saisir un nouveau jeu
  newGame() {
    this.game = {};
    this.dialog.label = 'Ajout d\'un jeu';
    this.dialog.open = true;
  }

  // Permet d'ouvrir app-dialog-game pour éditer un jeu
  editGame(game: Game) {
    this.game = { ...game };
    this.dialog.label = 'Modification d\'un jeu';
    this.dialog.open = true;
  }

  // Permet d'ouvrir app-dialog-game-readonly pour visualiser les infos d'un jeu
  seeGame(game: Game) {
    this.game = { ...game };
    this.dialogRO.open = true;
  }

  // Ensemble d'actions se passant après l'enregistrement d'un jeu
  private afterSaveGame(message: string) {
    this.games = [...this.games]; // on actualise games
    this.dialog.open = false; // on ferme la modal
    this.game = {}; // on réinitialise game
    // on affiche un message de succès
    this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: message, life: 3000 })
  }

  // Sauvegarde d'un jeu
  saveGame(game: any) {
    if (this.game.nom?.trim()) {
      if (this.game._id) {
        // UPDATE
        const id = this.findIndexById(this.game._id);
        // Appel API de maj d'un jeu
        this.restApi.updateGame(game._id, game).subscribe((data: {}) => {
          this.games[id] = data;
          this.afterSaveGame('Jeu mis à jour');
        });
      }
      else {
        // CREATE
        // Appel api de création d'un jeu
        this.restApi.createGame(game).subscribe((data: {}) => {
          this.games.push(data);
          this.afterSaveGame('Jeu ajouté');
        });
      }
    }
  }

  // Permet de retouver un jeu dans la liste (games) avec son id
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

  // Suppression d'un jeu
  deleteGame(game: Game) {
    // On vérifie si la personne veut réellement supprimer le jeu
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer <b>' + game.nom + '</b> ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Oui",
      rejectLabel: "Non",
      accept: () => {
        // S'il accepte, alors on fait un appel delete à l'api
        this.restApi.deleteGame(game._id).subscribe((data: {}) => {
          this.games = this.games.filter((g: any) => g._id !== game._id);
          this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Jeu supprimé', life: 3000 });
        });
      }
    });
  }
}

