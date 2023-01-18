import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateParams = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.params);

            next();
        } catch (error) {
            return res.status(500).json({
                error: 'Params validation failed. ' + error
            })
        }
    }
};

export const Params = {
    movies: {
        fetchMovies: Joi.object({
            search: Joi.string().valid('Matrix', 'Matrix Reloaded', 'Matrix Revolutions')
        })
    }
}