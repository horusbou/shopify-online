class HttpException extends Error {
  status: number;
  message: string;
  additionalInfo?: Record<string, any>;
  options: object | undefined;
  constructor(status: number, message: string, options?: object,additionalInfo?: Record<string, any>) {
    super(message);
    this.status = status;
    this.message = message;
    this.options = options;
    this.additionalInfo = additionalInfo
  }
}

export default HttpException;
