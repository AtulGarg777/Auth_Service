const jwt = require('jsonwebtoken');

const ProductAuth = (req, res, next) => {
    let authToken = req.headers['authorization'];
    if (!authToken) {
        return res.status(403).json({ message: "Unauthorized, token is required" })
    }

    try {
        let decodeToken = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user=decodeToken;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "token is expired or may be wrong" })
    }
}

module.exports = ProductAuth;