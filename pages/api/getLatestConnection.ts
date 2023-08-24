import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
			const client = await clientPromise;
			const db = client.db("geo-dashboard");

			const activites = db.collection("activities");

			const latestConnection = await activites
				.find({})
				.sort({ connection_id: -1 })
				.limit(1)
				.toArray();

			const latestConnectionID = latestConnection[0]
				? latestConnection[0].connection_id
				: 0;

            response.status(200).json(latestConnectionID)
	} catch (error) {
		console.log(error);
		response.status(500).json(error);
	}
}
