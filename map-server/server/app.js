import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db';
import "babel-polyfill";

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import pathRouter from './routes/pathRouter';

dotenv.config();

// Connect to database.
connectDb();

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// enable cors.
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', pathRouter);

// error handler
app.use((err, req, res, next) => {
	res.status(422).send({
		error: err.message
	});
});

export default app;