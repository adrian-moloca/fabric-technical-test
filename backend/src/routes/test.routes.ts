import express from 'express';
import databaseController from '../controllers/database.controller';
import movieController from '../controllers/movie.controller';
import posterController from '../controllers/poster.controller';
import { Params, validateParams } from '../functions/validateParams';

const testRoutes = express.Router();

testRoutes.get('/movies/:search', validateParams(Params.movies.fetchMovies), movieController.fetchMovies);
testRoutes.get('/database-movies/:search', movieController.searchDatabaseMovies);
testRoutes.get('/database-movies', movieController.getDatabaseMovies);
testRoutes.get('/database-posters', posterController.getDatabasePosters);
testRoutes.delete('/database', databaseController.dropDatabase);

export default testRoutes;
