import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		verified: { type: Boolean, default: false },
		lastLoggedIn: { type: Date },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
