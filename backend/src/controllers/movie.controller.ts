import { Request, Response, NextFunction } from "express";
import axios from 'axios';
import Movie from "../models/movie.model";
import IMovie from "../interfaces/movie.interface";
import IPoster from "../interfaces/poster.interface";
import Poster from '../models/poster.model';
import mongoose from "mongoose";
import { fetchURL, redirectURL} from "../utils/handleUrl";

/**
 * This controller will fetch the movie from the provided url and it will redirect to the local url + endpoint with the search parameter 
 */

const fetchMovies = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { search } = req.params;
        // fetch the movies from the url provided 
        await axios.get(fetchURL(search))
            // take the response from the server
            .then(async (response) => {
                // store the data from the response
                const movies: Array<IMovie> = response.data.Search;
                // best practice to use for looping trough array is to keep the size of the array in a variable
                const moviesLength = movies.length;
                // create a variable as an empty array for not saved movies into DB
                const notSavedMovies: Array<IMovie> = new Array();
                // push every movie that is not saved into DB
                for (let index = 0; index < moviesLength; index++) {
                    // Check if movie is already in database
                    const movieSaved = await Movie.findOne({imdbID: movies[index].imdbID});

                    if (!movieSaved) {
                        notSavedMovies.push(movies[index]);
                    }
                }

                const notSavedMoviesLength = notSavedMovies.length;

                // Saves new movies that are not stored in database
                for (let index = 0; index < notSavedMoviesLength; index++) {
                    // Check if movie has a Poster
                    if (String(notSavedMovies[index].Poster) !== 'N/A') {
                        // Check if duplicate poster url
                        const posterExists = await Poster.findOne({Poster: notSavedMovies[index].Poster}) as IPoster;

                        if (posterExists) {
                            // create a variable that will store as is declared on mongoose schema
                            const newMovie: IMovie = new Movie ({
                                _id: new mongoose.Types.ObjectId(),
                                Title: notSavedMovies[index].Title,
                                Year: notSavedMovies[index].Year,
                                imdbID: notSavedMovies[index].imdbID,
                                Type: notSavedMovies[index].Type,
                                Poster: posterExists._id
                            })
                            // respond with an error if something didn't worked well
                            await newMovie.save()
                                .catch((err) => {
                                    return res.status(500).json({
                                        error: 'Saving movie failed. ' + err
                                    })
                                })
                        } else {
                            // Save poster in database in order to store poster's ObjectId in movie model
                            const newPoster: IPoster = new Poster ({
                                _id: new mongoose.Types.ObjectId(),
                                Poster: notSavedMovies[index].Poster
                            })
                            
                            await newPoster.save()
                                .then(async (poster: IPoster) => {
                                    // Save movie in database
                                    const newMovie: IMovie = new Movie ({
                                        _id: new mongoose.Types.ObjectId(),
                                        Title: notSavedMovies[index].Title,
                                        Year: notSavedMovies[index].Year,
                                        imdbID: notSavedMovies[index].imdbID,
                                        Type: notSavedMovies[index].Type,
                                        Poster: poster._id
                                    })
        
                                    await newMovie.save()
                                        .catch((err) => {
                                            return res.status(500).json({
                                                error: 'Saving movie failed. ' + err
                                            })
                                        })
                                })
                                .catch((err) => {
                                    return res.status(500).json({
                                        error: 'Saving poster failed. ' + err
                                    })
                                })
                        }
                    } else {
                        // Save movie in database
                        const newMovie: IMovie = new Movie ({
                            _id: new mongoose.Types.ObjectId(),
                            Title: notSavedMovies[index].Title,
                            Year: notSavedMovies[index].Year,
                            imdbID: notSavedMovies[index].imdbID,
                            Type: notSavedMovies[index].Type
                        })

                        await newMovie.save()
                            .catch((err) => {
                                return res.status(500).json({
                                    error: 'Saving movie failed. ' + err
                                })
                            })
                    }
                }
                // Redirect to searchDatabaseMovies controller api
                return res.redirect(redirectURL(search));
            })
            .catch(err => {
                return res.status(500).json({
                    error: 'Axios GET failed. ' + err
                })
            })
    } catch (error) {
        return res.status(500).json({
            error: 'Fetching movies failed. ' + error
        })
    }
};

// controller that will take care for search movies into DB and also populate the Poster collection with the specific reference
const searchDatabaseMovies = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { search } = req.params;
        const moviesFound: Array<IMovie> = new Array();
        
        await Movie.find()
        .populate({path: 'Poster', select: 'Poster'})
        .then((databaseMovies: Array<IMovie>) => {
            databaseMovies.map((movie: IMovie) => {
                if (movie.Title.includes(search)) {
                    moviesFound.push(movie);
                }
            })
            return res.status(200).json({
                movies: moviesFound
            })
        })
        .catch((err) => {
            return res.status(500).json({
                error: 'Getting database movies failed. ' + err
            })
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Getting database movies failed. ' + error
        })
    }
};

// controller that will take care for getting the movies from DB
const getDatabaseMovies = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        await Movie.find()
            .then((movies: Array<IMovie>) => {
                return res.status(200).json({
                    movies,
                    length: movies.length
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    err
                })
            })
    } catch (error) {
        return res.status(500).json({
            error: 'Getting database movies failed. ' + error
        })
    }
};

// exporting the controllers
export default {
    fetchMovies,
    searchDatabaseMovies,
    getDatabaseMovies
};
