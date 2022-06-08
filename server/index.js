import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';


const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// const CONNECTION_URL = 'mongodb+srv://udaya:12345@memory-project.lar7e.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect( process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })
    }
).catch(err => {
    console.log(err);
}
);
mongoose.set('useFindAndModify', false);