import { transformData } from "@/functions/transformDataSuitedForGraphView";
import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import { Feature, TransormedData } from "@/types/types";
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
	const dataset = useSelectedDatasetStore((state) => state.dataset);

	const lines = (features: Feature[]) => {
		const entries = transformData(features, dataset).map((option: TransormedData) => {
		  const key = Object.keys(option);
		  return key;
		});
		const flattened = entries.reduce((prev, current) => {
			prev = prev.concat(current);
			return prev;
		}, []);
		const filtered = flattened.filter((key) => key !== "year");
		const uniqueKeys = [...new Set(filtered)];
	  
		return uniqueKeys.map((key) => {
		  return <Line type="monotone" stroke={getRandomColor()} dataKey={key} />;
		});
	  };

	  const getRandomColor = () => {
		return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
	  };


	return (
		<div className="leaflet-control bg-white h-full p-5 pb-10 w-1/3 rounded-lg mx-auto">
			<div className="flex gap-2">
				<h1 className="text-lg">Temporal course</h1>
			</div>
			<ResponsiveContainer height="100%" width="100%">
				<LineChart
					data={transformData(props.features, dataset)}
					margin={{ top: 30, right: 0, bottom: 0, left: 0 }}
				>
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<XAxis dataKey="year" />
					<YAxis />
					<Tooltip />
					{lines(props.features)}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
