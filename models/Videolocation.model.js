const { Schema, model } = require("mongoose");

const videolocationSchema = new Schema(
    {
        _user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        video: {
            type: String,
            required: true
        },
        _location: {
            type: Schema.Types.ObjectId,
            ref: "Location",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Videolocation", videolocationSchema)