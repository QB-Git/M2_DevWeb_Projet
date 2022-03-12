// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    apiVersion: 'api/v1',
    endpoints: {
      // GAME
      addGame: '/game/add', // PUT
      getGames: '/game/all', // GET
      getGameById: '/game/:id', // GET
      updateGame: '/game/update/:id', // PATCH
      deleteGame: '/game/delete/:id', // DELETE
      // LIST
      getList: '/list/:list', // GET
      // TEST
      test: '/', // GET
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
