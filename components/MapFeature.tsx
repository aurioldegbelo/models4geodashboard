import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import { useYearStore } from "@/store/selectedYearStore";
import { Feature } from "@/types/types";
import { getCorrectColor } from "@/utils/getCorrectColor";
import { useState } from "react";
import { GeoJSON } from "react-leaflet";

interface Props {
	feature: Feature;
	index: number;
}

export default function MapFeature(props: Props) {
	const [isHovered, setIsHovered] = useState(false);

	const selectedYear = useYearStore((state) => state.year);
	const setSelectedFeature = useSelectedFeatureStore(
		(state) => state.setFeature
	);

	const handleMouseOver = () => {
		setIsHovered(true);
	};

	const handleMouseOut = () => {
		setIsHovered(false);
	};

	const style = () => {
		return {
			fillColor: isHovered ? 'blue' : getCorrectColor(props.feature, selectedYear),
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
			// style={style(props.feature)}
			eventHandlers={{
				click: () => {
					setSelectedFeature(props.feature);
				},
				mouseover: handleMouseOver,
				mouseout: handleMouseOut,
			}}
            pathOptions={style()}
		/>
	);
}
