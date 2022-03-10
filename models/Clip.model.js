const { Schema, model } = require("mongoose");

const clipSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    clip: {
      type: String,
      required: true,
    },
    _location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Clip", clipSchema);
