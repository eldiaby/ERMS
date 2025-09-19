import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import User from "../models/User";

// helper to create token
export const signToken = (id: string) => {
	return jwt.sign({ id }, JWT_SECRET as string, { expiresIn: "7d" });
};

// @desc    Signup new user
// @route   POST /api/v1/auth/signup
export const signup = async (req: Request, res: Response) => {
	try {
		const { name, email, password, passwordConfirm } = req.body;

		const user = await User.create({ name, email, password, passwordConfirm });
		const token = signToken(user._id.toString());

		// hide password from response
		// (user as IUser).password = undefined;

		res.status(201).json({
			status: "success",
			token,
			data: {
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			},
		});
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(400).json({ status: "fail", message: err.message });
		} else {
			res.status(400).json({ status: "fail", message: "Unexpected error" });
		}
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
				.status(401)
				.json({ status: "fail", message: "Invalid email or password" });
		}

		// check password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res
				.status(401)
				.json({ status: "fail", message: "Invalid email or password" });
		}

		const token = signToken(user._id.toString());

		// hide password from response
		// (user as any).password = undefined;

		res.json({
			status: "success",
			token,
			data: {
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			},
		});
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(400).json({ status: "fail", message: err.message });
		} else {
			res.status(400).json({ status: "fail", message: "Unexpected error" });
		}
	}
};
