import express, { Request, Response } from 'express'
import { Book } from '../Models/book.model';

export const bookRoutes = express.Router()

// create a book

bookRoutes.post('/books', async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const book = await Book.create(body)

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error
        })
    }
})

// get all books also with query if necessary

bookRoutes.get('/books', async (req: Request, res: Response) => {
    try {
        let books;
        if (Object.keys(req.query).length > 0) {
            const filter = req.query.filter;
            const sortBy = req.query.sortBy;
            const sort = req.query.sort;
            const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : 10;

            const query: any = {};
            if (filter) {
                query.genre = filter;
            }

            const sortNumber = sort === 'asc' ? 1 : -1;

            let book = await Book.find(query)
                .sort({ [sortBy as string]: sortNumber })
                .limit(limit);
            books = book;

        } else {
            let book = await Book.find();
            books = book;
        }

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    } catch (error) {
        res.status(500).json({
            succuess: false,
            message: "Book retrieved request failed",
            error: error
        })
    }
});

// get a single by id

bookRoutes.get('/books/:id', async (req: Request, res: Response) => {
    try {
        // console.log(req.params);
        const id = req.params.id
        let book = await Book.findById(id)
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        })
    } catch (error) {
        res.status(500).json({
            succuess: false,
            message: "Book retrieved failed",
            error: error
        })
    }
});

// delete a book

bookRoutes.delete('/books/:id', async (req: Request, res: Response) => {
    try {
        // console.log(req.params);
        const id = req.params.id
        let book = await Book.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: book
        })
    } catch (error) {
        res.status(500).json({
            succuess: false,
            message: "Book deletion failed",
            error: error
        })
    }
});

// update a book

bookRoutes.put('/books/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const value = req.body.copies
        let book = await Book.findByIdAndUpdate(id, { copies: value }, { new: true })
        await book?.save();
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: book
        })
    } catch (error) {
        res.status(500).json({
            succuess: false,
            message: "Book update failed",
            error: error
        })
    }
});

