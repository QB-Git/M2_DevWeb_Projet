import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatGameService {

  constructor() { }

  getMiniature = (game: any) => {
    if('miniature' in game)
      return 'http://localhost:3000' + game.miniature;
    return 'assets/nopicture.png';
  }
}
