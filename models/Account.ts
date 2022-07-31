const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AccountModel = new Schema({
  ethAddress: { type: String },
  {{#if with_telegram}}
  telegramId: { type: Number, required: true, index: { unique: true }},
  telegramName: { type: String },
  telegramFullName: { type: String },
  {{/if}}
  timestamp: { type: Number, required: true },
  meta: { type: Object, default: {} },
})

const Account =
  mongoose.models.Account || mongoose.model("Account", AccountModel)

export { Account }
