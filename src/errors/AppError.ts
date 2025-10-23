export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static notFound(message: string): AppError {
    return new AppError(message, 404);
  }

  static badRequest(message: string): AppError {
    return new AppError(message, 400);
  }

  static conflict(message: string): AppError {
    return new AppError(message, 409);
  }
}
