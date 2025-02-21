const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(3).max(500),
  completed: Joi.boolean()
});

const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateTask
};