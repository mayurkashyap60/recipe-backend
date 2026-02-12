import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomId: { type: String, unique: true },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }],

    maxMembers: {
        type: Number,
        default: 6,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });


export default mongoose.model("Room", roomSchema);
