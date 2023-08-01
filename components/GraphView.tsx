import { transformData } from "@/functions/transformDataSuitedForGraphView";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
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
	usedOnFiltering?: boolean;
}

export default function GraphView(props: Props) {
	const dataset = useSelectedDatasetStore((state) => state.dataset);

	const comparisonFeature1 = useCompareFeaturesStore(
		(state) => state.feature1
	);

	const comparisonFeature2 = useCompareFeaturesStore(
		(state) => state.feature2
	);

	const lines = (features: Feature[]) => {
		const entries = transformData(features, dataset).map(
			(option: TransormedData) => {
				const key = Object.keys(option);
				return key;
			}
		);
		const flattened = entries.reduce((prev, current) => {
			prev = prev.concat(current);
			return prev;
		}, []);
		const filtered = flattened.filter((key: string) => key !== "year");
		const uniqueKeys = [...new Set(filtered)];

		return uniqueKeys.map((key: string, index: number) => {
			return (
				<Line
					type="monotone"
					stroke={
						props.usedOnFiltering &&
						comparisonFeature1 &&
						comparisonFeature2
							? getHighlightColor(key)
							: getRandomColor()
					}
					dataKey={key}
					key={index}
				/>
			);
		});
	};

	const getRandomColor = () => {
		return (
			"#" +
			((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
		);
	};

	const getHighlightColor = (name: string) => {
		if (comparisonFeature1?.properties.NUTS_NAME == name) {
			return "blue";
		}
		if (comparisonFeature2?.properties.NUTS_NAME == name) {
			return "blue";
		} else {
			return "gray";
		}
	};

	return (
		<div className="leaflet-control bg-white h-1/2 p-5 pb-10 w-full rounded-lg mx-auto">
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
