import { db } from "../utils/db.server";
import bcrypt from 'bcryptjs';

export type User = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export const listUsers = async (): Promise<User[]> => {
	return db.user.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			password: true
		},
	});
};

export const getUser = async (id: number): Promise<User | null> => {
	return db.user.findUnique({
		where: {
			id,
		},
	});
};

export const createUser = async (
	user: Omit<User, "id">
): Promise<User> => {
	const { firstName, lastName, email, password } = user;
	const passwordbcrypt = await bcrypt.hash(password, 10);
	return db.user.create({
		data: {
			firstName,
			lastName,
			email,
			password: passwordbcrypt,
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			password: true,
		},
	});
};

export const updateUser = async (
	user: Omit<User, "id">,
	id: number
): Promise<User> => {
	const { firstName, lastName, email, password } = user;
	const passwordbcrypt = await bcrypt.hash(password, 10);
	return db.user.update({
		where: {
			id,
		},
		data: {
			firstName,
			lastName,
			email,
			password: passwordbcrypt,
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			password: true,
		},
	});
};

export const deleteUser = async (id: number): Promise<void> => {
	await db.user.delete({
		where: {
			id,
		},
	});
};
