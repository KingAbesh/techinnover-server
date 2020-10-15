const { Router } = require("express");
const eCollectionRoute = require("./e-collection/e-collection.routes");

module.exports = () => {
  const router = Router();

  router.use("/e-collection", eCollectionRoute);

  router.use("/", (req, res) => {
    return res.json({
      status: true,
      message: "Welcome to techinnover e-collection app",
      data: [],
    });
  });

  return router;
};
