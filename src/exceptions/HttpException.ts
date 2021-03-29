export default class HttpException extends Error {
  public status: number;

  public message: string;

  public field: string;

  constructor(status: number, message: string, field: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.field = field;
  }
}
