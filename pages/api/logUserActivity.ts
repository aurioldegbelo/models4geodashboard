import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		if (request.method === "POST") {
			const { activity } = request.body;

			const MongoClient = await clientPromise;

			const db = MongoClient.db("geo-dashboard");
			const collection = db.collection("activityLog");

			const result = await collection.insertOne({
				timestamp: new Date(),
				activity,
			});

			// MongoClient.close();

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
