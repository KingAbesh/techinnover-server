const mongoose = require("mongoose");

module.exports = async function connectDatabase(url) {
  return await mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
