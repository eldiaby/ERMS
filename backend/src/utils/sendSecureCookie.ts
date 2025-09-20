import type { Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/env";
import type { IUser } from "../models/User";
import { sendResponse } from "./apiResponse";

interface Payload {
	id: string;
	role: string;
	email: string;
}

const signToken = (payload: Payload) => {
	return jwt.sign(payload, JWT_SECRET as string, {
		expiresIn: "7d",
	});
};

export const createSendToken = (
	user: IUser,
	statusCode: number,
	res: Response,
) => {
	const token = signToken({
		id: user._id.toString(),
		role: user.role,
		email: user.email,
	});

	// set token in secure cookie
	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});

	// use unified apiResponse
	sendResponse(res, {
		statusCode,
		status: "success",
		message: "Authentication successful",
		data: {
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		},
	});
};
