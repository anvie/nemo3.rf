const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const EligibleAddressModel = new Schema({
  address: { type: String, required: true, index: { unique: true } },
  {{#if with_telegram}}
  telegramId: { type: Number, default: 0 },
  telegramName: { type: String, default: "" },
  telegramFullName: { type: String, default: "" },
  {{/if}}
  eligible: { type: Boolean, default: false },
  discount: { type: Boolean, default: false },
  claimed: { type: Boolean, default: false },
  timestamp: { type: Number, required: true },
  meta: { type: Object, default: {} },
});

const EligibleAddress =
  mongoose.models.EligibleAddress ||
  mongoose.model("EligibleAddress", EligibleAddressModel);

export { EligibleAddress };
