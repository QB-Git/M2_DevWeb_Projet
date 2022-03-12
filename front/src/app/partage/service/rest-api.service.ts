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
    // console.log(game);
    let formData: any = new FormData();
    formData.append('nom', 'quentin');
    formData.append('status', 'En cours');
    formData.append('plateforme', 'PC');
    formData.append('plateforme', 'Wii');
    formData.append('support[]', 'Version physique');
    formData.append('miniature', game.miniature)
    // Object.keys(game).forEach(key => {
    //   formData.append(key, game[key])
    // })
    console.log(formData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    return this.http
      .put<Game>(
        this.api.addGame,
        formData,
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
        JSON.stringify(game),
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
