import { upload } from "../services/cloudinary.js";
import { sendMail } from "../services/sendGrid.service.js";

export const uploadImage = async (req, res) => {
    try {
        const url = await upload(req.file.buffer);
        return res.json({ url });
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor." });
    }
};

export const sendEmail = async (req, res) => {
    try {
        const { email, subject, text, html } = req.body;
        await sendMail(email, subject, text, html);
        return res.json({ message: "Email enviado." });
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor." });
    }
};