const eCollectionModel = require("./e-collection.model");

const collectData = async (dataObj) => {
  const createdData = await eCollectionModel.create(dataObj);
  return createdData;
};

module.exports = {
    collectData
}

