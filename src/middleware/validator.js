const Joi = require('joi');

exports.searchPlaces = (req, res, next) => {
    const schema = Joi.object({
        query: Joi.string().min(2).required(),
        lat: Joi.number().optional(),
        lng: Joi.number().optional(),
        radius: Joi.number().optional()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};

exports.directions = (req, res, next) => {
    const schema = Joi.object({
        origin: Joi.string().required(),
        destination: Joi.string().required(),
        mode: Joi.string().valid('driving', 'walking', 'bicycling', 'transit').optional()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};

exports.embed = (req, res, next) => {
    const schema = Joi.object({
        origin: Joi.string().required(),
        destination: Joi.string().required()
    });
    const { error } = schema.validate(req.query);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};