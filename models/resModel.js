const mongoose = require("mongoose");

const resSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    resName: {
        type: String,
        required: [true, "Please enter restaurant name"],
        minLength: [5, "Restaurant name should have a minimum of 5 characters!"],
        maxLength: [50, "Restaurant name shouldn't exceed 20 characters"]
    },
    neighborhood: {
        type: String,
        required: [true, "Please enter neighborhood"],
        minLength: [5, "Neighborhood should have a minimum of 5 characters!"],
        maxLength: [100, "Neighborhood shouldn't exceed 20 characters"]
    },
    features: {
        type: String,
        required: [true, "Please enter features"],
        minLength: [5, "Features should have a minimum of 5 characters!"],
        maxLength: [100, "Features shouldn't exceed 30 characters"]
    },
    foodType: {
        type: String,
        required: [true, "Please enter type"],
        minLength: [1, "Type should have a minimum of 5 characters!"],
        maxLength: [20, "Type shouldn't exceed 20 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
        minLength: [5, "Description should have a minimum of 5 characters!"],
        maxLength: [500, "Description shouldn't exceed 100 characters"]
    },
    location: {
        type: String,
        required: [true, "Please enter location"],
        minLength: [5, "Location should have a minimum of 5 characters!"],
        maxLength: [50, "Location shouldn't exceed 20 characters"]
    },
    photographs: {
        type: [],
        required: [true, "Please add photographs"]
    }
});

module.exports = mongoose.model('restaurant', resSchema);
