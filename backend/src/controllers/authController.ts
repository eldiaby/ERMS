import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import User from "../models/User";
import { sendResponse } from "../utils/apiResponse";
import { createSendToken } from "../utils/sendSecureCookie";

// @desc    Signup new user
// @route   POST /api/v1/auth/signup
export const signup = async (req: Request, res: Response) => {
	try {
		const { name, email, password, passwordConfirm } = req.body;

		const user = await User.create({ name, email, password, passwordConfirm });

		// use helper to send token + response
		createSendToken(user, StatusCodes.CREATED, res);
	} catch (err: any) {
		sendResponse(res, {
			statusCode: StatusCodes.BAD_REQUEST,
			status: "error",
			message: err.message,
		});
		// 	res
		// 		.status(StatusCodes.BAD_REQUEST)
		// 		.json({ status: "fail", message: err.message });
	}
};

// @desc    Login user
// @route   POST /api/v1/auth/login
export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		// check if user exists
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ status: "fail", message: "Invalid email or password" });
		}

		// check password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ status: "fail", message: "Invalid email or password" });
		}

		// send token + response
		createSendToken(user, StatusCodes.OK, res);
	} catch (err: any) {
		sendResponse(res, {
			statusCode: StatusCodes.BAD_REQUEST,
			status: "error",
			message: err.message,
		});
	}
};
