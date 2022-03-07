const { Schema, model } = require("mongoose");

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: String,
      longitude: String,
    },
    _clip: {
      type: Schema.Types.ObjectId,
      ref: "Clip",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Location", locationSchema);
