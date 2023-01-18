import mongoose, { Schema } from 'mongoose';
import IPoster from '../interfaces/poster.interface';

const PosterSchema: Schema = new Schema (
    {
        _id: { type: mongoose.Types.ObjectId },
        Poster: { type: String }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IPoster>('Poster', PosterSchema);
