import User from '../models/User.js';
import Book from '../models/Book.js';


const getAllUsers = async (req, res) => 
{
    const users = await User.find();

    try
    {
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json('error')
    }
}


const getUserById = async (req, res) => 
{
    const user = await User.findOne({_id: req.params.id}).exec();

    if(!user) return res.status(404).json("User not found");

    res.status(200).json(user);
}

const checkUserFines = async (req, res) => {
    
}

export default { getAllUsers, getUserById }