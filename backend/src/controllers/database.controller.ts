import Movie from '../models/movie.model';
import Poster from '../models/poster.model';
import { Request, Response, NextFunction } from 'express';

/**
 * This controller it will take care to drop the database, deleting element by element
 * This is an extra feature added to the task
 */

const dropDatabase = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        const movies = await Movie.find();

        for (let index = 0; index < movies.length; index++) {
            await movies[index].deleteOne();
        }

        const posters = await Poster.find();

        for (let index = 0; index < posters.length; index++) {
            await posters[index].deleteOne();
        }

        return res.status(200).json({
            message: 'Database successfully dropped.'
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Database drop failed. ' + error
        })
    }
};

export default {
    dropDatabase
};
