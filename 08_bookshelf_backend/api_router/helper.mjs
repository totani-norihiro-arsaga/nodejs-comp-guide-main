function errorHandler(controller) {
  return async (req, res, next) => {
    try {
      return await controller(res, req);
    } catch (error) {
      next(error);
    }
  };
}

export { errorHandler };