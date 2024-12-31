import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
    try {
        let token;
        token = req.cookies.jwt;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { userId: decoded.userId };
            next();
        } else {
            res.status(401).json({ error: "Token not found! " })
        }
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ error: "Session expired, please log in again." });
        } else {
            res.status(401).json({ error: "Unauthorized! Invalid Token!" });
        }
    }
}