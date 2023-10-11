import { DifferenceFeature, Feature, Side, YearType } from "@/types/types";
import TableHeader from "./TableHeader";
import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
import OnViewDatasetDescription from "./OnViewDatasetDescription";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import { logUserActivity } from "@/utils/logUserActivity";
import { useLogUserActivityStore } from "@/store/logUserActivityStore";

interface Props {
	features: Feature[] | DifferenceFeature[];
	usedOnHighlighting1View?: boolean;
	usedOnHighlighting2View?: boolean;
	usedAsDifferenceView?: boolean;
	side?: Side;
}

export default function TableView(props: Props) {
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
	const compareFeatureState = useCompareFeaturesStore(
		(state) => state.compareFeatureState
	);
	const selectedFeature = useSelectedFeatureStore((state) => state.feature);
	const setSelectedFeature = useSelectedFeatureStore(
		(state) => state.setFeature
	);
	const shouldLogUserActivity = useLogUserActivityStore(
		(state) => state.logUserActivity
	);

	const allYears: YearType[] = [
		"2008",
		"2009",
		"2010",
		"2011",
		"2012",
		"2013",
		"2014",
		"2015",
		"2016",
		"2017",
		"2018",
		"2019",
		"2020",
		"2021",
		"2022",
	];

	const colorizeRow = (name: string, index: number) => {
		if (
			props.usedOnHighlighting1View &&
			(comparisonFeature1?.properties.NUTS_NAME == name ||
				comparisonFeature2?.properties.NUTS_NAME == name ||
				comparisonFeature3?.properties.NUTS_NAME == name)
		) {
			return "bg-indigo-400 hover:bg-indigo-200";
		} else if (
			props.usedOnHighlighting2View &&
			(comparisonFeature1?.properties.NUTS_NAME == name ||
				comparisonFeature2?.properties.NUTS_NAME == name ||
				comparisonFeature3?.properties.NUTS_NAME == name)
		) {
			if (comparisonFeature1?.properties.NUTS_NAME == name)
				return "bg-indigo-400 hover:bg-indigo-200";
			if (comparisonFeature2?.properties.NUTS_NAME == name)
				return "bg-green-500 hover:bg-green-300";
			if (comparisonFeature3?.properties.NUTS_NAME == name)
				return "bg-yellow-400 hover:bg-yellow-200";
		} else if (selectedFeature?.properties.NUTS_NAME == name) {
			return "bg-indigo-400 hover:bg-indigo-200";
		} else {
			if (index % 2 != 0) {
				return "bg-gray-100 hover:bg-indigo-200";
			} else return "bg-white hover:bg-indigo-200";
		}
	};

	const isFeatureTypeGuard = (
		obj: Feature | DifferenceFeature
	): obj is Feature => {
		return "properties" in obj && obj.properties !== undefined;
	};

	const handleRowClick = (feature: Feature | DifferenceFeature) => {
		const clickedFeature = isFeatureTypeGuard(feature)
			? feature
			: undefined;

		if (clickedFeature) {
			if (
				compareFeatureState == "Comparison" ||
				compareFeatureState == "Selection"
			) {
				return;
			} else {
				setSelectedFeature(clickedFeature);
			}
		}
	};

	return (
		<div
			className="leaflet-control bg-white h-1/2 px-5 pt-5 w-full pb-14 rounded-lg"
			onMouseDown={() =>
				props.side == "right"
					? logUserActivity("TR", shouldLogUserActivity)
					: logUserActivity("TL", shouldLogUserActivity)
			}
		>
			<OnViewDatasetDescription
				usedOnDifferenceOnlyView={
					props.usedAsDifferenceView ? true : false
				}
			/>
			<div className="h-full w-full overflow-x-auto overflow-y-auto">
				<table className="table-auto w-full grow whitespace-nowrap">
					<TableHeader />
					<tbody>
						{props.features.map(
							(
								feature: Feature | DifferenceFeature,
								index: number
							) => (
								<tr
									className={` ${colorizeRow(
										feature.properties.NUTS_NAME,
										index
									)} `}
									key={index}
									onClick={() => handleRowClick(feature)}
								>
									<th className="w-56 p-2 text-md font-normal text-left">
										{feature.properties.NUTS_NAME}
									</th>
									{allYears.map(
										(year: YearType, index: number) => (
											<th
												className="w-16 text-right font-normal min-w-[50px] pr-2"
												key={index}
											>
												{dataset ==
													"roadnetworkdensity" &&
													feature.properties.values
														.roadnetworkdensity[
														year
													]}
												{dataset ==
													"greenlandpercentage" &&
													feature.properties.values
														.greenlandpercentage[
														year
													]}
												{dataset ==
													"woodlandpercentage" &&
													feature.properties.values
														.woodlandpercentage[
														year
													]}
												{dataset ==
													"agriculturallandpercentage" &&
													feature.properties.values
														.agriculturallandpercentage[
														year
													]}
											</th>
										)
									)}
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
