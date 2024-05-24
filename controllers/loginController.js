//Importe bcrypt para comparar a senha criptografada
//Importe jsonwebtoken para criar tokens de autenticação

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const handleLogin = async (req, res) => 
{
    const { email, pwd } = req.body;

    if(!email || !pwd)
    {
        return res.status(404).json("email and password are required")
    }

    //Encontrar usuário equivalente aos dados inseridos
    const foundUser = await User.findOne({email: email}).exec();

    if(!foundUser)
    {
        return res.sendStatus(401);
    }

    const match = await bcrypt.compare(pwd, foundUser.password);

    if(match)
    {
        //Pegar role depois
        //const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "UserInfo": {"username": foundUser.username}
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        )

        const refreshToken = jwt.sign(
            {
                "UserInfo": {"username": foundUser.username},
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        //Envie refreshToken como cookie
        res.cookie('jwt', refreshToken, { httpOnly: true })

        res.json({ accessToken });
    } else {
        res.status(404).json("erro ao realizar o login")
    }
}

export default { handleLogin };