import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import { minimumTwoOfThreeSelectedForComparison } from "@/utils/minimumTwoOfThreeSelectedForComparison";
import useTranslation from "next-translate/useTranslation";

interface Props {
	usedOnDifferenceOnlyView: boolean;
}

export default function OnViewDatasetDescription(props: Props) {
	let { t } = useTranslation("common");

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
				labelString = t("description.roadnetworkdensityDifference");
			} else {
				labelString = t("description.roadnetworkdensity");
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
				labelString = t("description.greenlandpercentageDifference");
			} else {
				labelString = t("description.greenlandpercentage");
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
				labelString = t("description.woodlandpercentageDifference");
			} else {
				labelString = t("description.woodlandpercentage");
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
				labelString = t(
					"description.agriculturallandpercentageDifference"
				);
			} else {
				labelString = t("description.agriculturallandpercentage");
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
				<p className="text-xs">{t('description.measured')} {getCorrectUnit()}</p>
			</div>
		</div>
	);
}
