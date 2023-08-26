import { Feature } from "@/types/types";

export const minimumTwoOfThreeSelectedForComparison = (
	feature1: Feature | undefined,
	feature2: Feature | undefined,
	feature3: Feature | undefined
): boolean => {
	if (feature1 != undefined && feature2 != undefined) {
		return true;
	} else if (feature2 != undefined && feature3 != undefined) {
		return true;
	} else if (feature1 != undefined && feature3 != undefined) {
		return true;
	} else {
		return false;
	}
};
