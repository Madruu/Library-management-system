import Book from '../models/Book.js';
import borrowBookService from '../services/borrowBookService.js';
import finesService from '../services/finesService.js';

import User from '../models/User.js';

const getAllBooks = async (req, res) => 
{
    const books = await Book.find();

    if(!books) return res.status(404).json("No books found")

    try
    {
        res.status(200).json(books);
    } catch(err) {
        res.status(404).json(err);
    }
}

const getBookbyId = async (req, res) => 
{
    const id = req.params.id;

    const book = await Book.findOne({_id: id}).exec();

    if(!book)
    {
        return res.status(500).json("Book not found");
    }

    try
    {
        res.status(200).json(book);
    } catch(err) {
        res.status(404).json(err);
    }
}

const editBookData = async (req, res) => 
{
    const id = req.params.id;

    const foundBook = await Book.findById(id).exec();
    if(!foundBook) return res.status(404).json("livro não encontrado");

    const { title, author } = req.body;

    //if(!title || !author) return res.status(404).json("Campo title e author são obrigatórios")

    //const book = await Book.findOne({_id: id}).exec();

    await Book.findByIdAndUpdate(id, {title: title, author: author})
    .then((result) => 
    {
        res.status(200).json(result);
    })
    .catch((err) => 
    {
        res.status(404).json(err)
    })
}

const deleteBook = async(req, res) => 
{
    const id = req.params.id;

    const foundBook = await Book.findOne({_id: id}).exec();

    if(!foundBook) return res.status(404).json("Book not found");
    if(foundBook.is_available === false) return res.status(403).json("Cant delete borrowed book");

    try
    {
        await foundBook.deleteOne();
        res.status(200).json("Book deleted successfully");
    } catch(err) {
        res.status(500).json(err);
    }
}

const addNewBook = async (req, res) => 
{
    const { title, author, genre, description } = req.body;

    if(!req?.body.title || !req?.body.author || !req?.body.genre) return res.status(400).json("Title, author and genre are required");

    try
    {
        const result = await Book.create(
            {
                title: title,
                author: author,
                genre: genre,
                description: description,
                is_available: true,
            }
        )
        res.status(201).json(result);
    } catch(err) {
        res.status(500).json(err);
    }
      
}

const borrowBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.body.num_matricula;
        
        const dueDate = await borrowBookService.getDueDate();
        const result = await borrowBookService.borrowBooks(userId, bookId);

        if(result.error) return res.status(result.status).json({message: result.message});

        await finesService.createFine(userId, bookId);
        
        res.status(200).json({message: "Book borrowed successfuly", book: result.book, user: result.user, dueDate: dueDate})
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}


const returnBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.body.num_matricula;

        const result = await borrowBookService.returnBooks(userId, bookId);

        if(result.error) return res.status(result.status).json({message: result.message});

        res.status(200).json({message: "Book returned successfuly", book: result.book, user: result.user});

    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export default { getAllBooks, getBookbyId, editBookData, deleteBook, addNewBook, borrowBook, returnBook };