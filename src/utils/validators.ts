// utils/validators.js
const mongoose = require("mongoose");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  isValidId,
};
