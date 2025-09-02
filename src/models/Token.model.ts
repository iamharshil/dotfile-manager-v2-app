import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		token: { type: String, required: true },
		ip: { type: String, required: true },
		userAgent: { type: String, required: true },
		country: { type: String },
		state: { type: String },
		city: { type: String },
		expiresAt: { type: Date, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

TokenSchema.index({ userId: 1 });
TokenSchema.index({ token: 1 });

const TokenModel = mongoose.models.Token || mongoose.model("Token", TokenSchema);
export default TokenModel;
