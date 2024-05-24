import User from '../models/User.js';
import Book from '../models/Book.js';

const createFine = async (userId, bookId) => {
    try {
        console.log(`bookId: ${bookId}`); // Adicione esta linha
        const dayThatUserReturned = new Date();
        const user = await User.findOne({num_matricula: userId}).exec();
        
        if(!user) return ({error: true, status: 404, message: "User not found"});
    
        const book = await Book.findOne({_id: bookId}).exec();

        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() - 1);
    
        console.log(`dayThatUserReturned > returnDate: ${dayThatUserReturned > returnDate}`); // Adicione esta linha

        if(dayThatUserReturned > returnDate) {
            const fine = 5;
            user.fines.push({fine: fine, bookTitle: book.title}); // O PROBLEMA ESTAVA NO MODELO DO BANCO DE DADOS, EM QUE O SCHEMA DE FINE NAO TINHA O CAMPO BOOKTITLE.
            await user.save();

            return {error: false, fine: fine, bookTitle: book.title};
        }

    } catch(error) {
        throw new Error(error.message);
    }
}



const checkFines = async (userId) => {
    try {
        const user = await User.findOne({num_matricula: userId}).exec();
    
        if(!user) return ({error: true, status: 404, message: "User not found"});
    
        if(user.fines.length === 0) return ({error: false, message: "User has no fines"});

        return {error: false, fines: user.fines};
    }catch(error) {
        throw new Error(error.message);
    }
}

export default { createFine, checkFines };