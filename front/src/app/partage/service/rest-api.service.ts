import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../Game';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  // Define API
  private api: any = {};

  constructor(private http: HttpClient) {
    const baseURL = `${env.backend.protocol}://${env.backend.host}:${env.backend.port}/${env.backend.apiVersion}`;
    Object.keys(env.backend.endpoints).forEach((key: string) => {
      // @ts-ignore
      this.api[key] = `${baseURL}${env.backend.endpoints[key]}`;
    });
  }

  private jsonToFormData(game: Game): FormData {
    let formData: FormData = new FormData();
    if(game.nom) formData.append('nom', game.nom);
    if(game.status) formData.append('status', game.status);
    if(game.note) formData.append('note', ''+game.note);
    if(game.plateforme) game.plateforme.forEach(p => formData.append('plateforme', p));
    if(game.support) game.support.forEach(p => formData.append('support', p));
    if(game.commentaire) formData.append('commentaire', game.commentaire);
    if(game.miniature) formData.append('miniature', game.miniature)
    return formData;
  }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Test
  test(): Observable<any> {
    return this.http
      .get<any>(this.api.test)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch games list
  getGames(): Observable<Game> {
    return this.http
      .get<Game>(this.api.getGames)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch game
  getGame(id: any): Observable<Game> {
    return this.http
      .get<Game>(this.api.getGameById.replace(':id', id))
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch list
  getList(list: any): Observable<string[]> {
    return this.http
      .get<string[]>(this.api.getList.replace(':list', list))
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create game
  createGame(game: any): Observable<Game> {
    return this.http
      .put<Game>(
        this.api.addGame,
        this.jsonToFormData(game),
        // JSON.stringify(game),
        // this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update game
  updateGame(id: any, game: any): Observable<Game> {
    return this.http
      .patch<Game>(
        this.api.updateGame.replace(':id', id),
        this.jsonToFormData(game),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete game
  deleteGame(id: any) {
    return this.http
      .delete<Game>(this.api.deleteGame.replace(':id', id), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
