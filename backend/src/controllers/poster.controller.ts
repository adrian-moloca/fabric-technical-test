import IPoster from '../interfaces/poster.interface';
import { Request, Response, NextFunction } from 'express';
import Poster from '../models/poster.model';

/**
 * This controller will handle the GET request for Posters - it is an async function with 3 parameteres: _req, res, _next
 * the _req and _next parameters are declared with _, because are not used
 * if the status code is 200, it will return an object with the array of posters and the length of the array
 * otherwise the status code it will be 500 and will return an error
 */
const getDatabasePosters = async (_req: Request, res: Response, _next: NextFunction) => {
    // try catch syntax - best practices to use in async functions
    try {
        // searching for all posters inside the DB
        await Poster.find()
        // the response from DB is an array of posters with the interface IPoster
            .then((posters: Array<IPoster>) => {
                return res.status(200).json({
                    posters,
                    length: posters.length
                })
            })
            .catch((err) => {
                // the response in case the server will throw an error
                return res.status(500).json({
                    err
                })
            })
    } catch (error) {
        // the response in case the server will throw an error
        return res.status(500).json({
            error: 'Getting database posters failed. ' + error
        })
    }
};

// exporting the controller
export default {
    getDatabasePosters
};
