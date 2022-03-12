export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '3000',
    endpoints: {
      // GAME
      addGame: '/api/v1/game/add', // PUT
      getAllGames: '/api/v1/game/all', // GET
      getGameById: '/api/v1/game/:id', // GET
      updateGame: '/api/v1/game/update', // PATCH
      deleteGame: '/api/v1/game/delete', // DELETE
      // LIST
      getList: 'api/v1/list/:list', // GET
      // TEST
      test: '/api/v1', // GET
    }
  }
};
