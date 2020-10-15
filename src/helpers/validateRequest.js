const createError = require("./createError");

/**
 * Creates a middleware to validate request payloads with Joi schemas
 */
module.exports = function validateRequest(schema, field = "body") {
  return function validateRequest(req, _res, next) {
    const result = schema.validate(req[field]);
    if (result.error) {
      next(
        createError(
          400,
          result.error.details.map((error) => ({
            title: result.error ? result.error.name : "Validation Error",
            detail: error.message,
            field: String(error.path[0]),
          }))
        )
      );
      return;
    }

    req[field] = result.value;
    next();
  };
};
