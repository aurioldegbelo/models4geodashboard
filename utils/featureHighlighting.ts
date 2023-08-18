import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import { Feature } from "@/types/types";

const comparisonFeature1 = useCompareFeaturesStore((state) => state.feature1);
const setComparisonFeature1 = useCompareFeaturesStore(
	(state) => state.setFeature1
);
const comparisonFeature2 = useCompareFeaturesStore((state) => state.feature2);
const setComparisonFeature2 = useCompareFeaturesStore(
	(state) => state.setFeature2
);
const selectionMode = useCompareFeaturesStore((state) => state.selectionMode);

const selectedFeature = useSelectedFeatureStore((state) => state.feature);
const setSelectedFeature = useSelectedFeatureStore((state) => state.setFeature);

export function addToComparisonProcess(feature: Feature) {
	if (comparisonFeature1 == undefined) {
		if (comparisonFeature1 == feature) {
			return;
		} else {
			setComparisonFeature1(feature);
			return;
		}
	} else if (comparisonFeature2 == undefined) {
		if (comparisonFeature2 == feature) {
			return;
		} else {
			setComparisonFeature2(feature);
		}
	}
}

export function removeFromComparisonProcess(feature: Feature) {
	if (comparisonFeature1 == feature) {
		setComparisonFeature1(undefined);
	}
	if (comparisonFeature2 == feature) {
		setComparisonFeature2(undefined);
	}
}

export function checkIfSelectedForComparison(feature: Feature) {
	if (feature == comparisonFeature1 || feature == comparisonFeature2) {
		return true;
	} else return false;
}
