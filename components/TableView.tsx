import { useDatasetStore } from "@/store/selectedDatasetStore";
import { Feature, YearType } from "@/types/types";
import TableHeader from "./TableHeader";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";

interface Props {
	features: Feature[];
}

export default function TableView(props: Props) {
	const dataset = useDatasetStore((state) => state.dataset);
	const selectedFeature = useSelectedFeatureStore((state) => state.feature);

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

	return (
		<div className="leaflet-control bg-white h-1/3 px-5 pt-5 pb-14 w-1/2 rounded-lg mx-auto">
			<div className="flex justify-between mb-2">
				<div className="flex gap-2">
					<h1 className="text-lg">Road network density per area |</h1>
					<small className="self-end pb-1">measured in: km/km²</small>
				</div>
				<div className="bg-indigo-200 py-1 px-3 rounded-full text-center">
					{dataset == "State" ? "States" : "Communities"}
				</div>
			</div>
			<div className="overflow-x-auto overflow-y-auto h-full w-full">
				<table className="table-auto w-full grow whitespace-nowrap">
					<TableHeader />
					<tbody>
						{props.features.map(
							(feature: Feature, index: number) => (
								<tr
									className={` ${
										index % 2 != 0
											? dataset == "State"
												? selectedFeature?.properties.NUTS_NAME == feature.properties.NUTS_NAME
													? " bg-indigo-100"
													: "bg-gray-100"
												: selectedFeature?.properties.GEN == feature.properties.GEN
													? " bg-indigo-100"
													: "bg-gray-100"
											: dataset == "State"
												? selectedFeature?.properties.NUTS_NAME == feature.properties.NUTS_NAME
													? " bg-indigo-100"
													: "bg-white"
												: selectedFeature?.properties.GEN == feature.properties.GEN
													? " bg-indigo-100"
													: "bg-white-100"
									} `}
									key={index}
								>
									<th className="w-56 p-2 text-md font-normal text-left">
										{dataset == "State"
											? feature.properties.NUTS_NAME
											: feature.properties.GEN}
									</th>
									{allYears.map((year: YearType) => (
										<th className="w-16 text-right font-normal min-w-[50px] pr-2">
											{feature.properties.values[year]}
										</th>
									))}
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
