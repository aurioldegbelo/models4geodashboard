import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import { useYearStore } from "@/store/selectedYearStore";
import { Feature } from "@/types/types";
import { getCorrectColor } from "@/utils/getCorrectColor";
import { useState } from "react";
import { GeoJSON, Popup, Tooltip } from "react-leaflet";
import PrimaryButton from "./PrimaryButton";
import { useDatasetStore } from "@/store/selectedDatasetStore";

interface Props {
	feature: Feature;
	index: number;
	setShowModal: (boolean: boolean) => void;
}

export default function MapFeature(props: Props) {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [tooltipContent, setTooltipContent] = useState<boolean>(false);
	const dataset = useDatasetStore((state) => state.dataset);
	const selectedYear = useYearStore((state) => state.year);
	const setSelectedFeature = useSelectedFeatureStore(
		(state) => state.setFeature
	);

	const handlePolygonClick = () => {
		setSelectedFeature(props.feature);
		setTooltipContent(true);
	};

	const openModal = () => {
		props.setShowModal(true);
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
				: getCorrectColor(props.feature, selectedYear),
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
			key={props.index}
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
						<div className="font-bold">
							{dataset == "State" && props.feature
								? props.feature.properties.NUTS_NAME
								: props.feature?.properties.GEN}
						</div>
						<PrimaryButton onClick={openModal}>
							Details
						</PrimaryButton>
					</div>
				</Popup>
			) : null}
		</GeoJSON>
	);
}
