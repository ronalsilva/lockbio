import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as LoginService from "./LoginService";

export const loginRouter = express.Router();

loginRouter.post(
	"/",
	body("email").isString(),
	body("password").isString(),
	async (request: Request, response: Response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}
		try {
			const user = request.body;
			const newUser = await LoginService.loginUser(user, request, response);
			return response.status(201).json(newUser);
		} catch (error: any) {
			return {
                error: true,
                message: 'Authentication error'
            };
		}
	}
);