import { useDatasetStore } from "@/store/selectedDataSetStore";
import { communities } from "../data/communities";
import { states } from "../data/states";
import { Feature, YearType } from "@/types/types";
import TableHeader from "./TableHeader";

interface Props {
	features: Feature[];
}

export default function TableView(props: Props) {
	const dataset = useDatasetStore((state) => state.dataset);

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
		<div className="leaflet-control leaflet-bar bg-white h-1/3 p-5 w-1/2">
			<div className="overflow-auto bg-white h-full rounded-md overflow-y-auto">
				<TableHeader />

				{props.features.map((feature: Feature, index: number) => (
					<div
						className={`flex px-2 py-1 ${
							index % 2 != 0 ? "bg-gray-100" : "bg-white"
						}`}
						key={index}
					>
						<>
							<div className="w-56 flex-shrink-0">
								{dataset == "State"
									? feature.properties.NUTS_NAME
									: feature.properties.GEN}
							</div>
							{allYears.map((year: YearType) => (
								<div className="w-10 text-right flex-shrink-0">
									{feature.properties.values[year]}
								</div>
							))}
						</>
					</div>
				))}

				{/* {dataset == "Community" ? (
					<>
						{communities.features.map((community: Feature) => (
							<div className="flex">
								<>
									<div className="w-56">
										{community.properties.GEN}
									</div>
									{allYears.map((year: YearType) => (
										<div className="w-10">
											{community.properties.values[year]}
										</div>
									))}
								</>
							</div>
						))}
					</>
				) : null} */}
			</div>
		</div>
	);
}
