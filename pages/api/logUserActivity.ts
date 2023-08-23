import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

let cachedDb: any = null;

export async function connectToDatabase() {
	if (cachedDb) {
		return cachedDb;
	}

	const client = await clientPromise;
	const db = client.db("geo-dashboard");

	cachedDb = db;
	return db;
}

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		if (request.method === "POST") {
			const { activity } = request.body;

			const db = await connectToDatabase();

			const activites = db.collection("activities");

			const latestConnection = await activites
				.find({})
				.sort({ connection_id: -1 })
				.limit(1)
				.toArray();

			const assignedConnectionID = latestConnection[0] ? latestConnection[0].connection_id : 0;

			const result = await activites.insertOne({
				timestamp: new Date(),
				activity: activity,
				connection_id: cachedDb == null ? assignedConnectionID + 1 : assignedConnectionID,
			});

			response
				.status(200)
				.json({ message: "Activity logged successfully" });
		} else {
			response.status(405).json({ message: "Method not allowed" });
		}
	} catch (error) {
		console.log(error);
		response.status(500).json(error);
	}
}
