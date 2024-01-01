import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        author: {
            type: String,
            require: true,
        },
        publishYear: {
            type: String,
            require: true,
        },
        imgUrl: {
            type: String,
            require: true,
        },
        availabilityStatus: {
            type: Boolean,
          
        },
    },
    {
        timestamps: true,
    }
)

export const Book = mongoose.model('books', bookSchema)