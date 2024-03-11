
const resModel = require('../models/resModel')
const fs = require('fs')

exports.addRestuarant = (req, res, next) => {


    const photographs = req?.files?.map((element, index) => element.path) || [];
    const { resName, neighborhood, features, foodType, description, location } = req.body;
    const id = req.params.id;
    try {
        const restaurants = resModel.create({
            userId: id,
            resName,
            neighborhood,
            features,
            foodType,
            description,
            location,
            photographs,

        })

        if (!restaurants) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Restaurants added successfully",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

exports.getRestuarants = async (req, res, next) => {
    try {
        const resData = await resModel.find()
        if (!resData) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
        res.status(200).json({
            success: true,
            message: "Restaurants added successfully",
            resData

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,

        })
    }


};

exports.myRestaurants = async (req, res, next) => {
    const id = req.params.id;
    try {
        const myRestaurants = await resModel.find({ userId: id })

        if (!myRestaurants) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Restaurants added successfully",
            myRestaurants,
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,

        })
    }
}

exports.updateRestuarants = async (req, res, next) => {

    // console.log(req.body);
    const { Object: Object, ...updated } = req.body;
    const { id } = req.params;
    // console.log(id);
    const resImage = req?.file ?? null;

    try {

        const updatedDetails = await resModel.findById(id);
        // console.log(restaurant);
        if (!updatedDetails) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }


        // console.log(updated);

        for (const key in updated) {
            updatedDetails[key] = updated[key]
        }

        if (resImage) {
            fs.unlinkSync(updatedDetails.photographs);
            updatedDetails.photographs = resImage.path;
        }
        await updatedDetails.save()


        res.status(200).json({
            success: true,
            message: "Restaurant updated successfully",
            data: updatedDetails
        });




    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }


}
exports.restuarantRemove = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedRes = await resModel.findByIdAndDelete(id)
        if (!deletedRes) {
            return res.status(404).json({
                success: false,
                message: "Invaild crediantials"
            })
        }
        fs.unlinkSync(deletedRes.photographs);
        res.status(200).json({

            success: true,
            message: "Restuarant deleted successfully  !!!!",
            deletedRes

        })

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message,

        })

    }
}