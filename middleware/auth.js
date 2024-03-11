const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.userAuth = (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }


    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, valid) => {

        if (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }


        try {
            const user = await User.findById(valid.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }
            req.user = user;
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        next();
    })

}

exports.authorization = (req, res, next) => {
    const currentUserRole = req.user.userType;
    if (currentUserRole === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Unauthozed request"
        })
    }

}