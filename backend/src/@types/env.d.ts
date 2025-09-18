declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production" | "test";

		PORT?: string;

		// # Database
		MONGO_URI?: string;
		REDIS_URL?: string;
		POSTGRES_URL?: string;

		// # Auth
		JWT_SECRET?: string;
		JWT_EXPIRES_IN?: string;

		// # Email
		SMTP_HOST?: string;
		SMTP_PORT?: string;
		SMTP_USER?: string;
		SMTP_PASS?: string;

		// # Cloud
		CLOUDINARY_URL?: string;
		AWS_ACCESS_KEY_ID?: string;
		AWS_SECRET_ACCESS_KEY?: string;
		AWS_REGION?: string;
		S3_BUCKET?: string;

		// # Payment
		STRIPE_SECRET?: string;
		PAYPAL_CLIENT_ID?: string;
		PAYPAL_SECRET?: string;

		// # Frontend
		CLIENT_URL?: string;
	}
}
