import Room from "../models/Room.js";
import RoomMember from "../models/RoomMember.js";
import generateRoomId from "../utils/generateRoomId.js";

/* ================= CREATE ROOM ================= */
export const createRoom = async (req, res) => {
    try {
        let roomId;
        let exists = true;

        while (exists) {
            roomId = generateRoomId();
            exists = await Room.findOne({ roomId });
        }

        const room = await Room.create({
            roomId,
            createdBy: req.user.id,
        });

        // creator becomes admin
        await RoomMember.create({
            roomId: room._id,
            userId: req.user.id,
            role: "admin",
        });

        res.status(201).json({
            message: "Room created",
            roomUrl: `/room/${room.roomId}`,
            roomId: room.roomId,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* ================= JOIN ROOM ================= */
export const joinRoom = async (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;

    const room = await Room.findOne({ roomId, isActive: true });

    if (!room) {
        return res.status(404).json({ message: "Room not found or inactive" });
    }

    // Already joined
    if (room.members.includes(userId)) {
        return res.json({ message: "Already joined room", roomId });
    }

    // Room full
    if (room.members.length >= room.maxMembers) {
        return res.status(403).json({
            message: "Room is full",
            maxMembers: room.maxMembers,
        });
    }

    room.members.push(userId);
    await room.save();

    res.json({
        message: "Joined room successfully",
        roomId,
        currentMembers: room.members.length,
    });
};
