import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import { useYearStore } from "@/store/selectedYearStore";
import { Feature } from "@/types/types";
import { getCorrectColor } from "@/utils/getCorrectColor";
import { useState } from "react";
import { GeoJSON, Popup } from "react-leaflet";
import PrimaryButton from "./Button/PrimaryButton";
import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";

interface Props {
	feature: Feature;
	setShowModal: (boolean: boolean) => void;
}

export default function MapFeature(props: Props) {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [tooltipContent, setTooltipContent] = useState<boolean>(false);
	const selectedYear = useYearStore((state) => state.year);
	const setSelectedFeature = useSelectedFeatureStore(
		(state) => state.setFeature
	);
	const dataset = useSelectedDatasetStore((state) => state.dataset);

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
				: getCorrectColor(props.feature, selectedYear, dataset),
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
						<PrimaryButton onClick={openModal} uppercase>
							Details
						</PrimaryButton>
						<div className="space-y-2">
							<div className="flex items-center gap-3">
								<div className="font-bold text-md">
									Comparison:
								</div>
								<div
									className={`${
										checkIfSelectedForComparison()
											? "bg-green-500"
											: "bg-gray-400"
									} rounded-full px-2 py-0.5`}
								>
									{checkIfSelectedForComparison()
										? "Selected"
										: "Not Selected"}
								</div>
							</div>
							{checkIfSelectedForComparison() ? (
								<PrimaryButton
									onClick={removeFromComparisonProcess}
									uppercase
								>
									Remove
								</PrimaryButton>
							) : (
								<PrimaryButton
									onClick={addToComparisonProcess}
									uppercase
								>
									Start Comparing
								</PrimaryButton>
							)}
						</div>
					</div>
				</Popup>
			) : null}
		</GeoJSON>
	);
}
