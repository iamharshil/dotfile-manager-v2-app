import mongoose, { type Connection } from "mongoose";

interface MongooseCache {
	conn: Connection | null;
}

declare global {
	// eslint-disable-next-line no-var
	var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
	cached = { conn: null };
	global.mongooseCache = cached;
}

const MONGODB_URI = process.env.MONGODB_URI;

async function database(): Promise<{ client: Connection }> {
	try {
		if (!cached) {
			throw new Error("Mongoose cache is not initialized");
		}

		if (cached.conn) {
			return { client: cached.conn };
		}

		if (!MONGODB_URI) {
			throw new Error("Please define the MONGODB_URI environment variable");
		}

		await mongoose.connect(MONGODB_URI);

		cached.conn = mongoose.connection;

		console.log("Connected to the Database");
		return { client: cached.conn };
	} catch (error) {
		console.log(`⚠️ ~ ${new Date().toLocaleString()} ~ error:`, error);
		throw new Error("Could not connect to the database");
	}
}

export default database;
