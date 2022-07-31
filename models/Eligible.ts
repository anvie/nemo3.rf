const mongoose = require("mongoose")
const Schema = mongoose.Schema

const EligibleModel = new Schema({
  address: { type: String, required: true, index: { unique: true }},
  {{#if with_telegram}}
  telegramId: { type: Number, required: true, index: { unique: true }},
  telegramName: { type: String },
  telegramFullName: { type: String },
  {{/if}}
  eligible: { type: Boolean, required: true },
  claimed: { type: Boolean, default: false },
  timestamp: { type: Number, required: true },
  meta: { type: Object, default: {} },
})

const Eligible =
  mongoose.models.Eligible || mongoose.model("Eligible", EligibleModel)

export { Eligible }
