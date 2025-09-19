import path from "node:path";
import dotenv from "dotenv";

// Pick env file based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || "production";
const envFile = `${nodeEnv}.env`;

dotenv.config({ path: path.join(__dirname, "..", "..", envFile) });

/**
 * Helper to enforce required env vars.
 */
function requireEnv(name: keyof NodeJS.ProcessEnv): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return value;
}

export const NODE_ENV = process.env.NODE_ENV ?? "development";

export const PORT = Number(process.env.PORT) || 5000;

// Database
export const MONGO_URI = requireEnv("MONGO_URI");
export const REDIS_URL = process.env.REDIS_URL ?? "";
export const POSTGRES_URL = process.env.POSTGRES_URL ?? "";

// Auth
export const JWT_SECRET = requireEnv("JWT_SECRET");
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

// Email
export const SMTP_HOST = process.env.SMTP_HOST ?? "";
export const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
export const SMTP_USER = process.env.SMTP_USER ?? "";
export const SMTP_PASS = process.env.SMTP_PASS ?? "";

// Cloud
export const CLOUDINARY_URL = process.env.CLOUDINARY_URL ?? "";
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID ?? "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ?? "";
export const AWS_REGION = process.env.AWS_REGION ?? "";
export const S3_BUCKET = process.env.S3_BUCKET ?? "";

// Payment
export const STRIPE_SECRET = process.env.STRIPE_SECRET ?? "";
export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID ?? "";
export const PAYPAL_SECRET = process.env.PAYPAL_SECRET ?? "";

// Frontend
export const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:3000";
