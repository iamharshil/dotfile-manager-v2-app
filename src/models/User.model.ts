import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		verified: { type: Boolean, default: false },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

UserSchema.index({ email: 1 });

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
