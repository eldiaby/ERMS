import type { Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

/**
 * Generic API response interface to enforce a consistent response structure
 */
export interface ApiResponse<T> {
	meta: {
		statusCode: number;
		status: "success" | "fail" | "error";
		message: string;
		metadata?: Record<string, any>;
	};
	data?: T;
	token?: string;
}

/**
 * Maps HTTP status codes to logical API statuses.
 * - 2xx → success
 * - 4xx → fail
 * - 5xx → error
 */
const getStatusFromCode = (
	statusCode: number,
): "success" | "fail" | "error" => {
	if (statusCode >= 200 && statusCode < 300) return "success";
	if (statusCode >= 400 && statusCode < 500) return "fail";
	return "error"; // 500+
};

/**
 * Send a standardized API response
 *
 * @template T - Type of the response data
 * @param res - Express Response object
 * @param options - Response configuration
 * @param options.statusCode - HTTP status code (default: 200 OK)
 * @param options.status - Optional API status override
 * @param options.message - Custom message (default: status code phrase)
 * @param options.metadata - Extra metadata (e.g., pagination info)
 * @param options.data - Main response payload
 * @param options.token - Optional JWT token (for auth responses)
 *
 * @returns Express Response with a consistent JSON structure
 */
export const sendResponse = <T>(
	res: Response,
	options: {
		statusCode?: number;
		status?: "success" | "fail" | "error";
		message?: string;
		metadata?: Record<string, any>;
		data?: T;
		token?: string;
	},
): Response<ApiResponse<T>> => {
	const {
		statusCode = StatusCodes.OK,
		status,
		message,
		metadata,
		data,
		token,
	} = options;

	return res.status(statusCode).json({
		meta: {
			statusCode,
			status: status || getStatusFromCode(statusCode),
			message: message || getReasonPhrase(statusCode),
			metadata,
		},
		data,
		token,
	});
};
