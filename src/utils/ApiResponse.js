class ApiResponse {
    constructor(response) {
      this.res = response;
    }
  
    successResponse(data) {
      data.statusCode = data.statusCode || 200;
      data.success = true;
  
      return this.res.status(data.statusCode).json(data);
    }
  
    successResponseForList(data) {
      data.total = data.total || 0;
      data.data = data.data || [];
  
      data.statusCode = data.statusCode || 200;
      data.success = true;
  
      return this.res.status(data.statusCode).json(data);
    }
  
    errorResponse(data) {
      data.statusCode = data.statusCode || 422;
      data.success = false;
  
      if (!data.code) {
        switch (data.statusCode) {
          case 400:
            data.code = 'unexpected_error';
            break;
          case 401:
            data.code = 'unauthorized';
            break;
          case 403:
            data.code = 'not_enough_permissions';
            break;
          case 404:
            data.code = 'not_found';
            break;
          case 500:
            data.code = 'internal_server_error';
            break;
          default:
            data.code = 'unknown_error';
            break;
        }
      }
  
      return this.res.status(data.statusCode).json(data);
    }
  }
  
  const ApiResponseHandler = (req, res, next) => {
    res.api = new ApiResponse(res);
    next();
  };
  
  module.exports = {
    ApiResponse,
    ApiResponseHandler
  };