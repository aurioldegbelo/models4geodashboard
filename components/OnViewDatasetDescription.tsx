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
				labelString = 'Differenzen von Straßennetzdichte in Gebietsfläche |';
			} else {
				labelString = 'Straßennetzdichte in Gebietsfläche |';
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
				labelString = 'Differenzen im Anteil von Gründland in Gebietsfläche |';
			} else {
				labelString = 'Anteil von Gründland in Gebietsfläche |';
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
				labelString = 'Differenzen im Anteil von Wald in Gebietsfläche |';
			} else {
				labelString = 'Anteil von Wald in Gebietsfläche |';
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
				labelString = 'Differenzen im Anteil von landwirtschaftlicher Fläche in Gebietsfläche |';
			} else {
				labelString = 'Anteil von landwirtschaftlicher Fläche in Gebietsfläche |';
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
			<div className="flex gap-1 items-center">
				<p className="text-md font-bold">{getHeadingString()}</p>
				<p className="text-xs">Einheit: {getCorrectUnit()}</p>
			</div>
		</div>
	);
}
