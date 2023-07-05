import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import { Feature } from "@/types/types";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface Props {
	features: Feature[];
}

export default function GraphView(props: Props) {
	const selectedFeature = useSelectedFeatureStore((state) => state.feature);
	const dataset = useSelectedDatasetStore((state) => state.dataset);

	const valuesAsArray = Object.entries(
		selectedFeature?.properties.values[dataset]
	).map(([key, value]) => ({ key, value }));

	const valuesAsArrayAllStates = props.features.map((feature) =>
		Object.entries(feature.properties.values[dataset]).map(
			([key, value]) => ({ key, value })
		)
	);

	console.log(valuesAsArray);
	console.log(valuesAsArrayAllStates);

	return (
		<div className="leaflet-control bg-white h-full p-5 pb-10 w-1/3 rounded-lg mx-auto">
			<div className="flex gap-2">
				<h1 className="text-lg">Temporal course</h1>
			</div>
			<ResponsiveContainer height="100%" width="100%">
				<LineChart
					data={valuesAsArray}
					margin={{ top: 30, right: 0, bottom: 0, left: 0 }}
				>
					<Line type="monotone" dataKey="value" stroke="#8884d8" />
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<XAxis dataKey="key" />
					<YAxis />
					<Tooltip />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
