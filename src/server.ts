import mongoose from "mongoose";
import app from "./app";
const port = 5000;
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g3mp55c.mongodb.net/mongoose-book-app?retryWrites=true&w=majority&appName=Cluster0`);
        // console.log('Connected with mongodb☺️');
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();