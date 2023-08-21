import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		const MongoClient = await clientPromise;
		const db = MongoClient.db("sample_restaurants");
		const collection = db.collection("restaurants");
		const results = await collection
			.find({})
			.project({
				grades: 0,
				borough: 0,
				restaurant_id: 0,
			})
			.limit(10)
			.toArray();

		response.status(200).json(results);
	} catch (error) {
		console.log(error);
		response.status(500).json(error);
	}
}
