// Phase 1: Write your JWT authentication middleware here
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please provide a Bearer token in the Authorization header.'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is missing'
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user info to request (ensuring both id and _id are accessible)
        req.user = {
            ...decoded,
            id: decoded.id || decoded._id,
            _id: decoded.id || decoded._id
        };

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

module.exports = authenticateUser;

