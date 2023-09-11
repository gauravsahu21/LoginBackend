export const generateExceptionMessage = (
    success: boolean=false,
    data: {}={},
    httpCode: number,
    message: string,
  ) => {
    return {
      success,
      data,
      httpCode,
      message,
      timestamp: Date.now(),
    };
  };
  