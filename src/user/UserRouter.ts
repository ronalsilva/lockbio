import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as UserService from "./UserService";

export const userRouter = express.Router();

// GET: List of all user
userRouter.get("/", async (request: Request, response: Response) => {
	try {
		const users = await UserService.listUsers();
		return response.status(200).json(users);
	} catch (error: any) {
		return response.status(500).json(error.message);
	}
});

// GET: user by ID
userRouter.get("/:id", async (request: Request, response: Response) => {
	const id: number = parseInt(request.params.id, 10);
	try {
		const user = await UserService.getUser(id);
		if (user) {
			return response.status(200).json(user);
		}
		return response.status(404).json("User could not be found");
	} catch (error: any) {
		return response.status(500).json(error.message);
	}
});

// POST: Create an user
// Params: firstName, lastName, email, password
userRouter.post(
	"/",
	body("firstName").isString(),
	body("lastName").isString(),
	body("email").isString(),
	body("password").isString(),
	async (request: Request, response: Response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}
		try {
			const user = request.body;
			const newUser = await UserService.createUser(user);
			return response.status(201).json(newUser);
		} catch (error: any) {
			return response.status(500).json(error.message);
		}
	}
);

// PUT: Updating an user
// Params: firstName, lastName, email, password
userRouter.put(
	"/:id",
	body("firstName").isString(),
	body("lastName").isString(),
	body("email").isString(),
	body("password").isString(),
	async (request: Request, response: Response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}
		const id: number = parseInt(request.params.id, 10);
		try {
			const user = request.body;
			const updatedUser = await UserService.updateUser(user, id);
			return response.status(200).json(updatedUser);
		} catch (error: any) {
			return response.status(500).json(error.message);
		}
	}
);

// DELETE: Delete an user based on the id
userRouter.delete("/:id", async (request: Request, response: Response) => {
	const id: number = parseInt(request.params.id, 10);
	try {
		await UserService.deleteUser(id);
		return response.status(204).json("User has been successfully deleted");
	} catch (error: any) {
		return response.status(500).json(error.message);
	}
});
