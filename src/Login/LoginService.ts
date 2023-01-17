// import User from "../../Models/User";
import { db } from "../utils/db.server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/Auth';

export type User = {
	email: string;
	password: string;
};

export const loginUser = async (
    user: Omit<User, "id">,
    req:any, 
    res:any
): Promise<User> => {
	const { email, password } = user;
	const userExist = await db.user.findFirst({
		where: {
			email,
		},
        select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			password: true
		},
	});

    if(!userExist) {
        return res.status(400).json({
            error: true,
            message: 'Usuário não encontrado'
        })
    }

    if(!(await bcrypt.compare(password, userExist.password))) {
        return res.status(400).json({
            error: true,
            message: 'Senha inválida'
        })
    }

    return res.status(200).json({
        user: {
            firstName: userExist.firstName,
            email: userExist.email
        },
        token: jwt.sign(
            {id: userExist.id}, 
            config.secret, 
            {expiresIn: config.expireIn}
        )
    })
};