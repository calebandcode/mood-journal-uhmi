import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import journalRoutes from './routes/journal.routes.js';
import suggestionRoutes from './routes/suggestion.route.js';

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api', journalRoutes);
app.use('/api', suggestionRoutes);
