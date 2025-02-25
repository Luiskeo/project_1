import jwt from "jsonwebtoken";

const getSneakers = async (req, res) => {
    const token = req.cookies?.sneakers;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        res.json({ message: "You are authenticated", data });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default { getSneakers };
