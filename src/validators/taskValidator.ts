import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const priorityEnum = ['High', 'Medium', 'Low'];
const statusEnum = ['pending', 'completed'];

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.string()
      .valid(...priorityEnum)
      .required(),
    assignedMember: Joi.string().required(),
    status: Joi.string()
      .valid(...statusEnum)
      .default('pending'),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
