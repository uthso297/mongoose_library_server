import { model, Schema } from "mongoose";
import { IBook } from "../Interfaces/book.interface";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTON', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: props => `${props.value} is not an integer`
        },
        min: [0, 'Number of copies cannot be negative']
    },
    available: {
        type: Boolean,
        default: true
    },
    url : {
        type: String,
        required: true
    }

},
    {
        versionKey: false,
        timestamps: true
    })

bookSchema.pre('save', function (next) {
    this.available = this.copies > 0;
    next();
})

export const Book = model<IBook>("Book", bookSchema)