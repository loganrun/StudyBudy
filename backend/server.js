import express from 'express';
import connectDB from './config/db.js'; // Assuming db.js is an ESM module
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Initialize our app variable with Express
const app = express();

// Connect Database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Single endpoint just to test API. Send data to browser
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
import usersRouter from './routes/api/users.js'; // Assuming users.js is an ESM module
import authRouter from './routes/api/auth.js'; // Assuming auth.js is an ESM module
import audioRouter from './routes/api/audio.js'; // Assuming audio.js is an ESM module
import chatRouter from './routes/api/chat.js'; // Assuming chat
import lectureRouter from './routes/api/lecture.js'; 

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/audio', audioRouter);
app.use('/api/chat', chatRouter);
app.use('/api/lecture', lectureRouter);

// Enviromental Variables
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


