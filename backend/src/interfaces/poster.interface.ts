import { Document, Types } from "mongoose";

interface IPoster extends Document {
    _id: Types.ObjectId,
    Poster: string
}

export default IPoster;
