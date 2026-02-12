import crypto from "crypto";

const generateRoomId = () => {
    return crypto.randomBytes(4).toString("hex");
};

export default generateRoomId;
