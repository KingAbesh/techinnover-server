/**
 * Creates an error payload
 */
function createError(status, errors) {
  return { status, errors, stack: new Error().stack };
}

createError.InternalServerError = (detail) =>
  createError(500, [
    {
      status: 500,
      title: "Internal Server Error",
      detail,
    },
  ]);

module.exports = createError;
