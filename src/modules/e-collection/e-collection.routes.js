const { Router } = require("express");
const validateRequest = require("../../helpers/validateRequest");
const eCollectionSchema = require("./e-collection.schema");
const eCollectionController = require("./e-collection.controller");

const router = Router();
  
router.post(
  "/submit",
  validateRequest(eCollectionSchema.collectData),
  eCollectionController.collectUserData
);

module.exports = router;
