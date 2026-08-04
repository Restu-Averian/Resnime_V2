export const successResponse = <T>(data: T) => {
  return {
    success: true,
    data,
  };
};

export const errorResponse = (code: string, message: string) => {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
};
