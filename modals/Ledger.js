const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  account: { type: String },
  description: { type: String },
  debit: { type: Number },
  credit: { type: Number },
});

const ledgerSchema = new Schema({
  date: { type: Date },
  rental_adress: { type: String },
  memo: { type: String },
  date_range: { type: String },
  attachment: { type: Array },
  total_amount:{type: Number},
  entries: [entrySchema], 
});

module.exports = mongoose.model("ledger", ledgerSchema);
