const bcrypt = require("bcrypt");
const saltRound = 10;
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.userRegistration = async (req, res, next) => {

    const { userName, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, saltRound)

    if (!hashedPassword) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }


    try {

        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            userType: 'user',
            isActive: true
        })

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Registration successfully compleated",
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,

        })
    }

}


exports.userLogin = async (req, res, next) => {
    var { userName, password } = req.body

    try {
        const user = await User.findOne({ userName }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invaild crediantials"
            })
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.status(404).json({
                success: false,
                message: "Invaild crediantials"
            })
        }

        if (!user.isActive) {
            return res.status(404).json({
                success: false,
                message: "user status not active"
            })
        }

        const options = {
            id: user._id,
            time: Date.now()
        }

        const token = jwt.sign(options, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });


        const userDetails = {
            userId: user._id,
            userName: user.userName,
            userEmail: user.email,
            userType: user.userType

        }
        res.status(200).cookie("token", token).json({
            success: true,
            message: "Login successful !!!!",
            userDetails,
        })

    } catch (error) {
        res.status(301).json({
            success: false,
            message: error.message,

        })
    }






}



exports.userProfupdate = async (req, res) => {

    try {
        const id = req.params.id;
        const updatedDetails = await User.findById(id)
        updatedDetails.userName = req.body.userName;
        updatedDetails.email = req.body.email;
        await updatedDetails.save()

        const userDetails = {
            userId: updatedDetails._id,
            userName: updatedDetails.userName,
            userEmail: updatedDetails.email

        }


        res.status(200).json({
            success: true,
            message: "user profile updated successfully  !!!!!!!!!!!!!!!!!!!!",
            userDetails
        })

    } catch (error) {
        res.status(301).json({
            success: false,
            message: error.message,

        })
    }
}


exports.userAccountDelete = async (req, res, next) => {

    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "Invaild crediantials"
            })
        }

        res.status(200).json({

            success: true,
            message: "user account deleted successfully  !!!!",

        })

    } catch (error) {

        res.status(301).json({
            success: false,
            message: error.message,

        })

    }


}
exports.getUsers = async (req, res) => {


    try {
        const allUsers = await User.find();

        if (!allUsers) {
            return res.status(500).json({
                success: false,
                message: "No users found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            allUsers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }


}

exports.userAcive = async (req, res) => {
    const id = req.params.id;
    try {
        const activeUser = await User.findByIdAndUpdate(id)
        if (!activeUser) {
            return res.status(404).json({
                success: false,
                message: "Invaild crediantials"
            })
        }
        if (activeUser.isActive) {
            activeUser.isActive = false
        }
        else {
            activeUser.isActive = true
        }

        await activeUser.save();

        res.status(200).json({
            success: true,
            message: "User status updated!"
        })

    } catch (error) {

        res.status(301).json({
            success: false,
            message: error.message,

        })

    }


}
