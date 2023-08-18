import { transformData } from "@/utils/transformDataSuitedForGraphView";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import { DifferenceFeature, Feature, TransormedData } from "@/types/types";
import {
	CartesianGrid,
	Label,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import OnViewDatasetDescription from "./OnViewDatasetDescription";
import GraphViewHoverTooltip from "./GraphViewHoverTooltip";

interface Props {
	features: Feature[] | DifferenceFeature[];
	usedOnHighlightingView?: boolean;
	usedOnDifferenceOnlyView?: boolean;
	allowEscapeViewBox?: boolean;
}

export default function GraphView(props: Props) {
	const dataset = useSelectedDatasetStore((state) => state.dataset);

	const comparisonFeature1 = useCompareFeaturesStore(
		(state) => state.feature1
	);

	const comparisonFeature2 = useCompareFeaturesStore(
		(state) => state.feature2
	);

	const lines = (features: Feature[] | DifferenceFeature[]) => {
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
						props.usedOnHighlightingView &&
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
			<OnViewDatasetDescription usedOnDifferenceOnlyView={props.usedOnDifferenceOnlyView ? true : false} />
			<ResponsiveContainer height="100%" width="100%">
				<LineChart
					data={transformData(props.features, dataset)}
					margin={{ top: 0, right: 0, bottom: 0, left: -15 }}
				>
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<XAxis dataKey="year" />
					<YAxis />
					<Tooltip
						content={<GraphViewHoverTooltip />}
						allowEscapeViewBox={{
							x: props.allowEscapeViewBox,
							y: false,
						}}
					/>
					{lines(props.features)}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
