import User from '../models/User.js';
import Book from '../models/Book.js';

const borrowBooks = async (userId, bookId) => {
    try {
        const book = await Book.findOne({_id: bookId}).exec();
        const user = await User.findOne({num_matricula: userId}).exec();

        //verify if book exists/is available to borrow
        if(!book) return ({error: true, status: 404, message: "Book not found"});
        if(!book.is_available) return ({error: true, status: 400, message: "This book is already borrowed"});

        if(!user) return ({error: true, status: 404, message: "User not found"});

        //send the borrowed book to the user
        user.borrowedBooks.push(bookId);
        await user.save();

        //Change book status
        book.is_available = false;
        await book.save();

        book.borrowedAt = new Date();

        return {error: false, book, user};

    } catch (error) {
        throw new Error(error.message);
    }
}


const getDueDate = async () => {
    const d = new Date()
    d.setDate(d.getDate() + 7);
    return d;
}


const returnBooks = async (userId, bookId) => {
    try {
        //Find users/books

        const user = await User.findOne({num_matricula: userId}).exec();
        const book = await Book.findOne({_id: bookId}).exec();


        //Treating standard errors

        if(!book) return ({error: true, status: 404, message: "Book not found"});
        if(book.is_available) return ({error: true, status: 400, message: "This book is not borrowed"});

        if(!user) return ({error: true, status: 404, message: "User not found"});
        if(!user.borrowedBooks.includes(bookId)) return ({error: true, status: 400, message: "This user didnt borrow this book"})


        //Remove book from user
        //user.borrowedBooks = user.borrowedBooks.splice(user.borrowedBooks.indexOf(bookId), 1);==>Não atribuir novo resultado a user.borrowedBooks
        //IMPORTANTE: NÃO ATRIBUIR METODO SPLICE A UMA VARIAVEL, POIS SENÃO O SPLICE RETORNA O ITEM QUE FOI REMOVIDO, E NÃO O ARRAY ATUALIZADO
        user.borrowedBooks.splice(user.borrowedBooks.indexOf(bookId), 1);
        await user.save();

        //Change book status
        book.is_available = true;
        await book.save();

        

        return {error: false, book, user};

    } catch (error) {
        throw new Error(error.message);
    }
}


export default { borrowBooks, returnBooks, getDueDate };