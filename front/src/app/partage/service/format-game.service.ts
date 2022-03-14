import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

const baseURL = `${env.backend.protocol}://${env.backend.host}:${env.backend.port}/${env.backend.apiVersion}`;
@Injectable({
  providedIn: 'root'
})
export class FormatGameService {

  constructor() { }

  // Retourne soit une miniature si elle existe, soit une image par défaut
  getMiniature = (game: any) => {
    return this.checkIfMiniature(game) ? `${env.backend.protocol}://${env.backend.host}:${env.backend.port}${game.miniature}` : 'assets/nopicture.png';
  }

  // Permet de checker si la miniature existe
  checkIfMiniature = (game: any) => {
    return 'miniature' in game && game.miniature != '';
  }
}
