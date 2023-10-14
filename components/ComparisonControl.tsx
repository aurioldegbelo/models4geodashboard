import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
import { useLogUserActivityStore } from "@/store/logUserActivityStore";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import { minimumTwoOfThreeSelectedForComparison } from "@/utils/minimumTwoOfThreeSelectedForComparison";
import { logUserActivity } from "@/utils/logUserActivity";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

interface Props {
	usedOnHighlighting2View: boolean;
}

export default function ComparisonControl(props: Props) {
	const { t } = useTranslation("common");

	const comparisonFeature1 = useCompareFeaturesStore(
		(state) => state.feature1
	);
	const setComparisonFeature1 = useCompareFeaturesStore(
		(state) => state.setFeature1
	);
	const comparisonFeature2 = useCompareFeaturesStore(
		(state) => state.feature2
	);
	const setComparisonFeature2 = useCompareFeaturesStore(
		(state) => state.setFeature2
	);
	const comparisonFeature3 = useCompareFeaturesStore(
		(state) => state.feature3
	);
	const setComparisonFeature3 = useCompareFeaturesStore(
		(state) => state.setFeature3
	);
	const compareFeatureState = useCompareFeaturesStore(
		(state) => state.compareFeatureState
	);
	const setCompareFeatureState = useCompareFeaturesStore(
		(state) => state.setCompareFeatureState
	);
	const setSelectedFeature = useSelectedFeatureStore(
		(state) => state.setFeature
	);
	const shouldLogUserActivity = useLogUserActivityStore(
		(state) => state.logUserActivity
	);

	const handleStartSelectionProcess = () => {
		setSelectedFeature(undefined);
		setCompareFeatureState("Selection");
	};

	const handleStartComparisonProcess = () => {
		if (
			minimumTwoOfThreeSelectedForComparison(
				comparisonFeature1,
				comparisonFeature2,
				comparisonFeature3
			)
		) {
			handleLogUserActivity();
			setCompareFeatureState("Comparison");
		} else {
			toast(t('comparisonControl.toastErrorSelectMin2Features'), {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
				type: "error",
			});
		}
	};

	const handleLogUserActivity = () => {
		if (
			comparisonFeature1 == undefined ||
			comparisonFeature2 == undefined ||
			comparisonFeature3 == undefined
		) {
			logUserActivity("M2", shouldLogUserActivity);
		} else {
			logUserActivity("M3", shouldLogUserActivity);
		}
	};

	const handleStopComparisonProcess = () => {
		setComparisonFeature1(undefined);
		setComparisonFeature2(undefined);
		setComparisonFeature3(undefined);
		setCompareFeatureState("Off");
	};

	document.addEventListener("keypress", (event) => {
		if (event.key == "q" && compareFeatureState == "Selection") {
			event.preventDefault();
			handleStopComparisonProcess();
		}
	});

	return (
		<>
			<div className="leaflet-control bg-white rounded-lg w-52">
				{compareFeatureState == "Off" ? (
					<div
						className="flex items-center justify-center cursor-pointer text-md font-semibold w-full rounded-lg h-10 border-2 bg-white text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-white hover:bg-indigo-100 hover:ring-offset-indigo-600 hover:text-indigo-900 hover:ring-indigo-600 hover:border-indigo-600"
						onClick={handleStartSelectionProcess}
					>
						{t('comparisonControl.compareFeatureStateOff')}
					</div>
				) : null}
				{compareFeatureState == "Selection" ? (
					<div
						className="flex items-center justify-center cursor-pointer text-md font-semibold w-full rounded-lg h-10 border-2 bg-white text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-white hover:bg-indigo-100 hover:ring-offset-indigo-600 hover:text-indigo-900 hover:ring-indigo-600 hover:border-indigo-600"
						onClick={handleStartComparisonProcess}
					>
						{t('comparisonControl.compareFeatureStateSelection')}
					</div>
				) : null}
				{compareFeatureState == "Comparison" ? (
					<div
						className="flex items-center justify-center cursor-pointer text-md font-semibold w-full rounded-lg h-10 border-2 bg-white text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-white hover:bg-indigo-100 hover:ring-offset-indigo-600 hover:text-indigo-900 hover:ring-indigo-600 hover:border-indigo-600"
						onClick={handleStopComparisonProcess}
					>
						{t('comparisonControl.compareFeatureStateComparison')}
					</div>
				) : null}
				{compareFeatureState == "Selection" ? (
					<div className="absolute mt-1 p-2 w-52 rounded-md bg-white text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm flex flex-wrap gap-1">
						{comparisonFeature1 == undefined &&
						comparisonFeature2 == undefined ? (
							<p>
								{t(
									"comparisonControl.compareFeatureStateSelectionText"
								)}
								<b> Q </b>
								{t(
									"comparisonControl.compareFeatureStateSelectionText2"
								)}
							</p>
						) : null}
						{comparisonFeature1 != undefined ? (
							<p
								className={`px-2 py-1 rounded-xl w-fit ${
									props.usedOnHighlighting2View == true
										? "text-indigo-800 bg-indigo-300"
										: "text-indigo-800 bg-indigo-300"
								}`}
							>
								{comparisonFeature1.properties.NUTS_NAME}
							</p>
						) : null}
						{comparisonFeature2 != undefined ? (
							<p
								className={`px-2 py-1 rounded-xl w-fit ${
									props.usedOnHighlighting2View == true
										? "text-green-700 bg-green-200"
										: "text-indigo-800 bg-indigo-300"
								}`}
							>
								{comparisonFeature2.properties.NUTS_NAME}
							</p>
						) : null}
						{comparisonFeature3 != undefined ? (
							<p
								className={`px-2 py-1 rounded-xl w-fit ${
									props.usedOnHighlighting2View == true
										? "text-yellow-800 bg-yellow-400"
										: "text-indigo-800 bg-indigo-300"
								}`}
							>
								{comparisonFeature3.properties.NUTS_NAME}
							</p>
						) : null}
					</div>
				) : null}
			</div>
		</>
	);
}
