import { Document, Types } from "mongoose";

interface IMovie extends Document {
    _id: Types.ObjectId,
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster?: Types.ObjectId
}

export default IMovie;
