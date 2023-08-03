import { Feature, YearType } from "@/types/types";
import TableHeader from "./TableHeader";
import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";

interface Props {
	features: Feature[];
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
			comparisonFeature1 &&
			comparisonFeature2 &&
			(comparisonFeature1?.properties.NUTS_NAME == name ||
				comparisonFeature2?.properties.NUTS_NAME == name)
		) {
			return "bg-indigo-200";
		} else {
			if (index % 2 != 0) {
				return "bg-gray-100";
			} else return "bg-white";
		}
	};

	return (
		<div className="leaflet-control bg-white h-1/2 px-5 pt-5 w-full pb-14 rounded-lg">
			<div className="flex mb-2">
				{dataset == "roadnetworkdensity" && (
					<div className="flex gap-2">
						<h1 className="text-lg">
							Road network density per area |
						</h1>
						<small className="self-end pb-1">
							measured in: km/km²
						</small>
					</div>
				)}
				{dataset == "greenlandpercentage" && (
					<div className="flex gap-2">
						<h1 className="text-lg">
							Share of grassland in total area |
						</h1>
						<small className="self-end pb-1">measured in: %</small>
					</div>
				)}
				{dataset == "woodlandpercentage" && (
					<div className="flex gap-2">
						<h1 className="text-lg">
							Share of woodland in total area |
						</h1>
						<small className="self-end pb-1">measured in: %</small>
					</div>
				)}
			</div>
			<div className="h-full w-full overflow-x-auto overflow-y-auto">
				<table className="table-auto w-full grow whitespace-nowrap">
					<TableHeader />
					<tbody>
						{props.features.map(
							(feature: Feature, index: number) => (
								<tr
									className={` ${colorizeRow(
										feature.properties.NUTS_NAME,
										index
									)} `}
									key={index}
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
