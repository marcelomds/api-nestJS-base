export class ApiResponse {
  static success(
    data: any = null,
    message: string = 'Successo',
    statusCode: number = 200,
  ) {
    return {
      status: true,
      response: data,
      message,
      statusCode,
    };
  }

  static error(error: any = null, message = 'Erro', statusCode = 400) {
    let detailedResponse: any = error;

    if (error instanceof Error) {
      detailedResponse = {
        message: error.message,
        exception: error.constructor.name,
        stack: error.stack,
      };
    }

    return {
      status: false,
      response: detailedResponse,
      message,
      statusCode,
    };
  }
}
