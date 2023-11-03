const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subscriberschema = mongoose.Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestemps: true }
);

const Subscriber = mongoose.model("Subscriber", Subscriberschema);

module.exports = { Subscriber };
