/* @flow */
export class BadSignatureError extends Error {
  status: number;

  constructor() {
    super();
    this.message = 'The signature is incorrect';
    this.status = 403;
  }
}
