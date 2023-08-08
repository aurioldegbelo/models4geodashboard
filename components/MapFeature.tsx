import { Feature } from "@/types/types";
import { useState } from "react";
import { GeoJSON, Popup } from "react-leaflet";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";

interface Props {
	feature: Feature;
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
	const selectionMode = useCompareFeaturesStore(
		(state) => state.selectionMode
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
		}
	};

	const removeFromComparisonProcess = () => {
		if (comparisonFeature1 == props.feature) {
			setComparisonFeature1(undefined);
		}
		if (comparisonFeature2 == props.feature) {
			setComparisonFeature2(undefined);
		}
	};

	const checkIfSelectedForComparison = () => {
		if (
			props.feature == comparisonFeature1 ||
			props.feature == comparisonFeature2
		) {
			return true;
		} else return false;
	};

	const handlePolygonClick = () => {
		if (selectionMode) {
			if (checkIfSelectedForComparison()) {
				removeFromComparisonProcess();
			} else {
				addToComparisonProcess();
			}
		} else {
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
			fillColor: isHovered
				? "blue"
				: checkIfSelectedForComparison()
				? "blue"
				: "gray",
			weight: 1,
			opacity: 1,
			color: "white",
			dashArray: "0",
			fillOpacity: isHovered ? 0.5 : 0.7,
		};
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
						<div className="font-bold text-xl">
							{props.feature &&
								props.feature.properties.NUTS_NAME}
						</div>
					</div>
				</Popup>
			) : null}
		</GeoJSON>
	);
}
