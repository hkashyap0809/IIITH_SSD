const mongoose = require('mongoose');

let Schema = mongoose.Schema;
const QuerySchema = new Schema({
  examName: { type: String, reuired: true },
  courseName: { type: String, required: true },
  questionNum: { type: Number, required: true },
  taRoll: { type: String, required: true },
  stdRoll: { type: String, required: true },
  taComment: { type: String },
  stdComment: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

const Query = mongoose.model('Query', QuerySchema);
module.exports = Query;
