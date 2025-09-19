import { hash, verify } from "argon2";
import { type Document, model, type ObjectId, Schema } from "mongoose";
// import bcrypt from "bcryptjs";

export interface IUser extends Document {
	_id: ObjectId;
	name: string;
	email: string;
	password: string;
	role: "user" | "admin";
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, index: true },
		password: { type: String, required: true, minlength: 6, select: false },
		role: { type: String, enum: ["user", "admin"], default: "user" },
	},
	{ timestamps: true },
);

// hash password before saving
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await hash(this.password);
	next();
});

// instance method to compare passwords
UserSchema.methods.comparePassword = function (
	candidatePassword: string,
): Promise<boolean> {
	return verify(this.password, candidatePassword);
};

export default model<IUser>("User", UserSchema);
