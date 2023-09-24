import { transformData } from "@/utils/transformDataSuitedForGraphView";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import {
	DifferenceFeature,
	Feature,
	Side,
	TransormedData,
} from "@/types/types";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import OnViewDatasetDescription from "./OnViewDatasetDescription";
import GraphViewHoverTooltip from "./GraphViewHoverTooltip";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import { logUserActivity } from "@/utils/logUserActivity";
import { useLogUserActivityStore } from "@/store/logUserActivityStore";

interface Props {
	features: Feature[] | DifferenceFeature[];
	usedOnHighlighting2View?: boolean;
	usedOnHighlighting1View?: boolean;
	usedAsDifferenceView?: boolean;
	allowEscapeViewBox?: boolean;
	side?: Side;
}

export default function GraphView(props: Props) {
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

	const isFeatureArrayTypeGuard = (
		arr: Feature[] | DifferenceFeature[]
	): arr is Feature[] => {
		return (arr as Feature[]).every((item) => "properties" in item);
	};

	const handleLineClick = (payload: any) => {
		const clickedFeature = isFeatureArrayTypeGuard(props.features)
			? props.features.find(
					(feature) => feature.properties.NUTS_NAME == payload.dataKey
			  )
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
					stroke={getLineColor(key)}
					dataKey={key}
					key={index}
					activeDot={{
						onClick: (event, payload) => {
							handleLineClick(payload);
						},
					}}
				/>
			);
		});
	};

	const getLineColor = (name: string) => {
		if (props.usedOnHighlighting1View) {
			if (
				comparisonFeature1 &&
				comparisonFeature1?.properties.NUTS_NAME == name
			) {
				return "blue";
			}
			if (
				comparisonFeature2 &&
				comparisonFeature2?.properties.NUTS_NAME == name
			) {
				return "blue";
			}
			if (
				comparisonFeature3 &&
				comparisonFeature3?.properties.NUTS_NAME == name
			) {
				return "blue";
			} else {
				return "gray";
			}
		} else if (props.usedOnHighlighting2View) {
			if (
				comparisonFeature1 &&
				comparisonFeature1?.properties.NUTS_NAME == name
			) {
				return "blue";
			}
			if (
				comparisonFeature2 &&
				comparisonFeature2?.properties.NUTS_NAME == name
			) {
				return "green";
			}
			if (
				comparisonFeature3 &&
				comparisonFeature3?.properties.NUTS_NAME == name
			) {
				return "orange";
			} else {
				return "gray";
			}
		} else if (
			selectedFeature &&
			selectedFeature.properties.NUTS_NAME == name
		) {
			return "blue";
		} else {
			return "gray";
		}
	};

	return (
		<div
			className="leaflet-control bg-white h-1/2 p-5 pb-10 w-full rounded-lg mx-auto"
			onMouseEnter={() => {
				props.side == "right"
					? logUserActivity("GR", shouldLogUserActivity)
					: logUserActivity("GL", shouldLogUserActivity);
			}}
		>
			<OnViewDatasetDescription
				usedOnDifferenceOnlyView={
					props.usedAsDifferenceView ? true : false
				}
			/>
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
