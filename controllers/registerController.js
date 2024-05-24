import User from '../models/User.js';
import bcrypt from 'bcrypt';

//Create function to handle register from new user
const handleNewUser = async (req, res) => 
{
    const { user, num_matricula, email, pwd } = req.body;

    if(!user || !num_matricula || !email || !pwd)
    {
        return res.status(404).json("Nome, numero de matricula, email e senha são obrigatórios");
    }

    //check if user is duplicated
    const duplicate = await User.findOne({ username: user }).exec();

    if(duplicate)
    {
        return res.sendStatus(409);
    }

    //Creating the user
    try
    {
        const hashedPassword = await bcrypt.hash(pwd, 10); //10 salt value

        //Creating the new user
        const newUser = await User.create({
            "username": user,
            "num_matricula": num_matricula,
            "email": email,
            "password": hashedPassword
        })

        console.log(newUser);

        res.status(201).json({'Message': `user ${user} created successfully`});
    } catch(err) {
        res.sendStatus(500);
    }
}

export default { handleNewUser };

