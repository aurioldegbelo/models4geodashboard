import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export default function GraphView() {
	const selectedFeature = useSelectedFeatureStore((state) => state.feature);

	const valuesAsArray = Object.entries(
		selectedFeature?.properties.values
	).map(([key, value]) => ({ key, value }));

	return (
		<div className="leaflet-control bg-white h-full p-5 pb-10 w-1/2 rounded-lg mx-auto">
			<div className="flex gap-2">
				<h1 className="text-lg">Temporal course</h1>
				<div className="bg-indigo-200 py-1 px-3 rounded-full text-center">
					{selectedFeature.properties.NUTS_NAME}
				</div>
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
