"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../Models/book.model");
const borrow_model_1 = require("../Models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
// get borrow list with aggregation
exports.borrowRoutes.get('/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve borrowed books summary'
        });
    }
}));
// post borrow 
exports.borrowRoutes.post('/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { book: bookId, quantity, dueDate } = body;
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        res.json({
            success: false,
            message: "Book not found",
        });
    }
    if (book && book.copies <= 0) {
        res.json({
            success: false,
            message: "Book is not available",
        });
    }
    const borrow = yield borrow_model_1.Borrow.create(body);
    if (book) {
        book.copies -= quantity;
        yield book.save();
    }
    res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow
    });
}));
