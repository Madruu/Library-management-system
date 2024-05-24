import express from 'express';
import dotenv from 'dotenv';
import books from './routes/booksRoutes.js'
import register from './routes/registerRoutes.js'
import login from './routes/loginRoutes.js';
import users from './routes/usersRoutes.js';
import fines from './routes/finesRoutes.js';
import verifyToken from './middlewares/verifyToken.js';
dotenv.config();
import path from 'path';
import mongoose from 'mongoose';
import connectDB from './config/dbConnect.js';
//const express = require('express');
//const dotenv = require('dotenv');

const app = express();

const PORT = process.env.PORT || 3000
connectDB();

app.use(express.json());


app.use('/books', books)
app.use('/register', register);
app.use('/login', login);
app.use('/fines', fines);

app.use(verifyToken);
app.use('/users', users);
//app utilizará extensões, middlewares e rotas criadas na aplicação
//app.use(express.json());

//Não serão utilizadas rotas dentro do server desta vez;

//Utiliza-se conexão com banco de dados via mongoose

mongoose.connection.once('open', () => 
{
    console.log("connected to mongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

