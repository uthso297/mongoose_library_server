import express, { Request, Response } from 'express';
import { Book } from '../Models/book.model';
import { Borrow } from '../Models/borrow.model';

export const borrowRoutes = express.Router();

// get borrow list with aggregation

borrowRoutes.get('/borrow', async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            {
                $unwind: '$bookDetails'
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookDetails.title',
                        isbn: '$bookDetails.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve borrowed books summary'
        });
    }
});

// post borrow 

borrowRoutes.post('/borrow', async (req: Request, res: Response) => {
    const body = req.body
    const { book: bookId, quantity, dueDate } = body
    const book = await Book.findById(bookId)

    if (!book) {
        res.json({
            success: false,
            message: "Book not found",
        })
    }

    if (book && book.copies <= 0) {
        res.json({
            success: false,
            message: "Book is not available",
        })
    }

    const borrow = await Borrow.create(body)
    if (book) {
        book.copies -= quantity;
        await book.save();
    }
    res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow
    })
})

