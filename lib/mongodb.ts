import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI as string;
const options = {};

if (!URI) {
	throw new Error("Please add your Mongo URI to .env.local");
}

let client = new MongoClient(URI, options);
let clientPromise: Promise<any>;

declare global {
	var _mongoClientPromise: Promise<any>
}

if (process.env.NODE_ENV !== "production") {
	if (!global._mongoClientPromise) {
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	clientPromise = client.connect().then(() => client);
}

export default clientPromise;
