import json from '../utils/json';

/**
 * Exception
 */
export default class Exception {

  constructor(message, status) {
    this.message = message || 'Unknown error occurred';
    this.status = status || 500;
  }

  /**
   * Catch exception
   */
  static catch(exception) {
    if (exception instanceof Exception) {
      return exception.response();
    } else {
      // Do not return error message, but log it for Cloud Watch
      console.log(exception);
      return new Exception(exception.message, exception.status).response();
    }
  }

  /**
   * Get response
   */
  response(response = {}) {
    return json({
      ...response,
      statusCode: this.status,
      body: {
        message: this.message,
        errors: [ this.message ]
      }
    });
  }
}