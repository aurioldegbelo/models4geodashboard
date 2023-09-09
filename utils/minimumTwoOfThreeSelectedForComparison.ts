import { Feature } from "@/types/types";

export const minimumTwoOfThreeSelectedForComparison = (
	feature1?: Feature,
	feature2?: Feature,
	feature3?: Feature
) => {
	return (
		(feature1 != undefined && feature2 != undefined) ||
		(feature2 != undefined && feature3 != undefined) ||
		(feature1 != undefined && feature3 != undefined)
	);
};
