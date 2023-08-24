import generateUniqueToken from "./generateUniqueToken";

export const logUserActivity = async (activity: any) => {
	let connection_id: string = "";

	if (localStorage.getItem("token") != undefined) {
		await getTokenOfLatestConnection().then((token) => {
			if (token && localStorage.getItem("token") == token) {
				connection_id = token;
			}
		});
	} else {
		const sessionToken = generateUniqueToken();
		localStorage.setItem("token", sessionToken);
		connection_id = sessionToken;
	}

	try {
		const response = await fetch("/api/logUserActivity", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ activity, connection_id }),
		});

		if (response.ok) {
			console.log("Activity logged successfully");
		} else {
			console.error("Error logging activity:", response.statusText);
		}
	} catch (error) {
		console.error("Error logging activity:", error);
	}
};

const getTokenOfLatestConnection = async () => {
	const response = await fetch("/api/getLatestConnection");
	const responseJson = await response.json();
	return responseJson;
};
