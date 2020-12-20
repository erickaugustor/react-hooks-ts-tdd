export class UnexpectedError extends Error {
  constructor () {
    super('Algo aconteceu de errado.')
    this.name = 'UnexpectedError'
  };
};
