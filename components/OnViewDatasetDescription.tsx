import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import { minimumTwoOfThreeSelectedForComparison } from "@/utils/minimumTwoOfThreeSelectedForComparison";

interface Props {
	usedOnDifferenceOnlyView: boolean;
}

export default function OnViewDatasetDescription(props: Props) {
	const dataset = useSelectedDatasetStore((state) => state.dataset);

	const comparisonFeature1 = useCompareFeaturesStore(
		(state) => state.feature1
	);

	const comparisonFeature2 = useCompareFeaturesStore(
		(state) => state.feature2
	);

	const comparisonFeature3 = useCompareFeaturesStore(
		(state) => state.feature3
	);

	const getHeadingString = (): string => {
		let labelString = "";
		if (dataset == "roadnetworkdensity") {
			if (
				minimumTwoOfThreeSelectedForComparison(
					comparisonFeature1,
					comparisonFeature2,
					comparisonFeature3
				) &&
				props.usedOnDifferenceOnlyView
			) {
				labelString = "Difference in road network density per area |";
			} else {
				labelString = "Road network density per area |";
			}
		} else if (dataset == "greenlandpercentage") {
			if (
				minimumTwoOfThreeSelectedForComparison(
					comparisonFeature1,
					comparisonFeature2,
					comparisonFeature3
				) &&
				props.usedOnDifferenceOnlyView
			) {
				labelString =
					"Difference in share of grassland in total area |";
			} else {
				labelString = "Share of grassland in total area |";
			}
		} else if (dataset == "woodlandpercentage") {
			if (
				minimumTwoOfThreeSelectedForComparison(
					comparisonFeature1,
					comparisonFeature2,
					comparisonFeature3
				) &&
				props.usedOnDifferenceOnlyView
			) {
				labelString = "Difference in share of woodland in total area |";
			} else {
				labelString = "Share of woodland in total area |";
			}
		} else if (dataset == "agriculturallandpercentage") {
			if (
				minimumTwoOfThreeSelectedForComparison(
					comparisonFeature1,
					comparisonFeature2,
					comparisonFeature3
				) &&
				props.usedOnDifferenceOnlyView
			) {
				labelString =
					"Difference in share of agricultural land in total area |";
			} else {
				labelString = "Share of agricultural land in total area |";
			}
		}
		return labelString;
	};

	const getCorrectUnit = (): string => {
		let unitString = "";
		if (dataset == "roadnetworkdensity") {
			unitString = "km/km²";
		} else if (dataset == "greenlandpercentage") {
			unitString = "%";
		} else if (dataset == "woodlandpercentage") {
			unitString = "%";
		} else if (dataset == "agriculturallandpercentage") {
			unitString = "%";
		}
		return unitString;
	};

	return (
		<div className="flex mb-2">
			<div className="flex gap-2">
				<h1 className="text-lg">{getHeadingString()}</h1>
				<small className="self-end pb-1">
					measured in: {getCorrectUnit()}
				</small>
			</div>
		</div>
	);
}
