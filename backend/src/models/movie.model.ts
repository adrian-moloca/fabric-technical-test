import mongoose, { Schema } from 'mongoose';
import IMovie from '../interfaces/movie.interface';

const MovieSchema: Schema = new Schema (
    {
        _id: { type: mongoose.Types.ObjectId },
        Title: { type: String },
        Year: { type: String },
        imdbID: { type: String },
        Type: { type: String },
        Poster: { type: mongoose.Schema.Types.ObjectId, ref: 'Poster' }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IMovie>('Movie', MovieSchema);
