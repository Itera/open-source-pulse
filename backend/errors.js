/* @flow */
export class BaseError extends Error {}
export class BadSignatureError extends BaseError {
  status: number;

  constructor() {
    super();
    this.message = 'The signature is incorrect';
    this.status = 403;
  }
}
