import express from 'express'
import dotenv, { config } from 'dotenv'
import cors from 'cors'
import connectDb from './database/dbConnect.js';
import compression from 'compression';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoute.js'
import userRoutes from './routes/userRoute.js'

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 8080


app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
}));

app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
// app.get('/', (req, res) => {
//     return res.send(" <h1>Backend running</h1>")
// })


app.use((err, req, res, next) => {
    console.error(err.message, "❌❌");
    res.status(500).send('Something went wrong!');
});
app.listen(port, () => {
    console.log(`Server is ✅ running on http://localhost:${port}`);

})
