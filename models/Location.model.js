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
    _user: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Videolocation", locationSchema);
