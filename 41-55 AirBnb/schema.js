const Joi = require("joi");//This library is used to validate schema

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price: Joi.number().required().min(0),
        // image: Joi.string().allow("", null)
    }).required(),
    categories: Joi.array().items(Joi.string().valid("Trending", "Rooms", "Iconic cities", "Mountains", "Amazing pool", "Castles", "Camping", "Farms", "Arctic")),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});