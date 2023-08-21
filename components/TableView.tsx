import { DifferenceFeature, Feature, YearType } from "@/types/types";
import TableHeader from "./TableHeader";
import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
import OnViewDatasetDescription from "./OnViewDatasetDescription";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";

interface Props {
	features: Feature[] | DifferenceFeature[];
	usedOnHighlightingView?: boolean;
	usedOnDifferenceOnlyView?: boolean;
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

	const allYears: YearType[] = [
		"2022",
		"2021",
		"2020",
		"2019",
		"2018",
		"2017",
		"2016",
		"2015",
		"2014",
		"2013",
		"2012",
		"2011",
		"2010",
		"2009",
		"2008",
	];

	const colorizeRow = (name: string, index: number) => {
		if (
			props.usedOnHighlightingView &&
			(comparisonFeature1?.properties.NUTS_NAME == name ||
				comparisonFeature2?.properties.NUTS_NAME == name ||
				comparisonFeature3?.properties.NUTS_NAME == name)
		) {
			return "bg-indigo-400 hover:bg-indigo-200";
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
		<div className="leaflet-control bg-white h-1/2 px-5 pt-5 w-full pb-14 rounded-lg">
			<OnViewDatasetDescription
				usedOnDifferenceOnlyView={
					props.usedOnDifferenceOnlyView ? true : false
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
