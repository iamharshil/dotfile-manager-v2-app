import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
		verified: { type: Boolean, default: false },
		otp: { type: String },
		otpExpires: { type: Date },
		otpRetries: { type: Number, default: 0 },
		lastLoggedIn: { type: Date },
		name: { type: String },
		image: { type: String },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
