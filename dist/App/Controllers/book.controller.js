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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../Models/book.model");
exports.bookRoutes = express_1.default.Router();
// create a book
exports.bookRoutes.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error
        });
    }
}));
// get all books also with query if necessary
exports.bookRoutes.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let books;
        if (Object.keys(req.query).length > 0) {
            const filter = req.query.filter;
            const sortBy = req.query.sortBy;
            const sort = req.query.sort;
            const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : 10;
            const query = {};
            if (filter) {
                query.genre = filter;
            }
            const sortNumber = sort === 'asc' ? 1 : -1;
            let book = yield book_model_1.Book.find(query)
                .sort({ [sortBy]: sortNumber })
                .limit(limit);
            books = book;
        }
        else {
            let book = yield book_model_1.Book.find();
            books = book;
        }
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        res.status(500).json({
            succuess: false,
            message: "Book retrieved request failed",
            error: error
        });
    }
}));
// get a single by id
exports.bookRoutes.get('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.params);
        const id = req.params.id;
        let book = yield book_model_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            succuess: false,
            message: "Book retrieved failed",
            error: error
        });
    }
}));
// delete a book
exports.bookRoutes.delete('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.params);
        const id = req.params.id;
        let book = yield book_model_1.Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            succuess: false,
            message: "Book deletion failed",
            error: error
        });
    }
}));
// update a book
exports.bookRoutes.put('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const value = req.body.copies;
        let book = yield book_model_1.Book.findByIdAndUpdate(id, { copies: value }, { new: true });
        yield (book === null || book === void 0 ? void 0 : book.save());
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            succuess: false,
            message: "Book update failed",
            error: error
        });
    }
}));
