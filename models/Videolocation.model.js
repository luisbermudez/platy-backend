const { Schema, model } = require("mongoose");

const videolocationSchema = new Schema(
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
    description: String,
    videoUrl: {
      type: String,
      required: true,
    },
    public_id: String,
    location: {
      name: String,
      coordinates: {
        latitude: {
          type: String,
          required: true,
        },
        longitude: {
          type: String,
          required: true,
        }
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Videolocation", videolocationSchema);
