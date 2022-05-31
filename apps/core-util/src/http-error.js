import httpErrors from 'http-errors';


export function createHttpError(code) {
  return httpErrors(code);
}
