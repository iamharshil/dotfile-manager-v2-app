import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string) => {
	return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = async (userId: string) => {
	const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
	return token;
};
