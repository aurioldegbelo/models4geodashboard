import { Feature } from "@/types/types";
import { useState } from "react";
import { GeoJSON, Popup } from "react-leaflet";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";

interface Props {
	feature: Feature;
	usedOnHighlighting2View: boolean;
}

export default function MapFeature(props: Props) {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [tooltipContent, setTooltipContent] = useState<boolean>(false);

	const comparisonFeature1 = useCompareFeaturesStore(
		(state) => state.feature1
	);
	const setComparisonFeature1 = useCompareFeaturesStore(
		(state) => state.setFeature1
	);
	const comparisonFeature2 = useCompareFeaturesStore(
		(state) => state.feature2
	);
	const setComparisonFeature2 = useCompareFeaturesStore(
		(state) => state.setFeature2
	);
	const comparisonFeature3 = useCompareFeaturesStore(
		(state) => state.feature3
	);
	const setComparisonFeature3 = useCompareFeaturesStore(
		(state) => state.setFeature3
	);
	const compareFeatureState = useCompareFeaturesStore(
		(state) => state.compareFeatureState
	);

	const selectedFeature = useSelectedFeatureStore((state) => state.feature);
	const setSelectedFeature = useSelectedFeatureStore(
		(state) => state.setFeature
	);

	const addToComparisonProcess = () => {
		if (comparisonFeature1 == undefined) {
			if (comparisonFeature1 == props.feature) {
				return;
			} else {
				setComparisonFeature1(props.feature);
				return;
			}
		} else if (comparisonFeature2 == undefined) {
			if (comparisonFeature2 == props.feature) {
				return;
			} else {
				setComparisonFeature2(props.feature);
			}
		} else if (comparisonFeature3 == undefined) {
			if (comparisonFeature3 == props.feature) {
				return;
			} else {
				setComparisonFeature3(props.feature);
			}
		}
	};

	const removeFromComparisonProcess = () => {
		if (comparisonFeature1 == props.feature) {
			setComparisonFeature1(undefined);
		}
		if (comparisonFeature2 == props.feature) {
			setComparisonFeature2(undefined);
		}
		if (comparisonFeature3 == props.feature) {
			setComparisonFeature3(undefined);
		}
	};

	const checkIfSelectedForComparison = () => {
		if (
			props.feature == comparisonFeature1 ||
			props.feature == comparisonFeature2 ||
			props.feature == comparisonFeature3
		) {
			return true;
		} else return false;
	};

	const handlePolygonClick = (event: any) => {
		if (compareFeatureState == 'Selection') {
			if (checkIfSelectedForComparison()) {
				removeFromComparisonProcess();
			} else {
				addToComparisonProcess();
			}
		} else if (compareFeatureState == 'Off') {
			setSelectedFeature(props.feature);
			setTooltipContent(true);
		}
	};

	const handleMouseOver = () => {
		setIsHovered(true);
	};

	const handleMouseOut = () => {
		setIsHovered(false);
	};

	const style = () => {
		return {
			fillColor: getPolygonColor(),
			weight: 1,
			opacity: 1,
			color: "white",
			dashArray: "0",
			fillOpacity: isHovered ? 0.5 : 0.7,
		};
	};

	const getPolygonColor = () => {
		if (props.feature == selectedFeature) {
			return "blue";
		}
		if (checkIfSelectedForComparison()) {
			if (props.usedOnHighlighting2View) {
				if (props.feature == comparisonFeature1) {
					return "blue"
				}
				if (props.feature == comparisonFeature2) {
					return "green"
				}
				if (props.feature == comparisonFeature3) {
					return "orange"
				}
			} else {
				return "blue";
			}
		}
		if (isHovered) {
			return "#5c6bc0";
		} else {
			return "gray";
		}
	};

	return (
		<GeoJSON
			data={props.feature.geometry}
			eventHandlers={{
				click: handlePolygonClick,
				mouseover: handleMouseOver,
				mouseout: handleMouseOut,
			}}
			pathOptions={style()}
		>
			{tooltipContent ? (
				<Popup>
					<div className="space-y-5">
						<div className="font-bold text-lg">
							{props.feature &&
								props.feature.properties.NUTS_NAME}
						</div>
					</div>
				</Popup>
			) : null}
		</GeoJSON>
	);
}
