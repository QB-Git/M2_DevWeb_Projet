export const environment = {
  production: true,
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
