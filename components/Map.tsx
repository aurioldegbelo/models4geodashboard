import { states } from "../data/states";
import React, { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { Feature } from "@/types/types";
import TableView from "./TableView";
import GraphView from "./GraphView";
import MapFeature from "./MapFeature";
import DatasetModal from "./Modal/DatasetModal";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
import { getFeatureAsDifferenceOfTwoFeatures } from "@/utils/getFeatureAsDifferenceOfTwoFeatures";
import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import ComparisonControl from "./ComparisonControl";

interface Props {
	bounds: number[][];
	center: number[];
	filteringOnly: boolean;
	differenceOnly: boolean;
	highlightingAndDifference: boolean;
}

const POSITION_CLASSES = {
	bottomleft: "leaflet-bottom leaflet-left",
	bottomright: "leaflet-bottom leaflet-right",
	topleft: "leaflet-top leaflet-left",
	topright: "leaflet-top leaflet-right",
};

export default function Map(props: Props) {
	const [showDatasetModal, setShowDatasetModal] = useState<boolean>(false);

	const dataset = useSelectedDatasetStore((state) => state.dataset);

	const selectionMode = useCompareFeaturesStore(
		(state) => state.selectionMode
	);

	const comparisonFeature1 = useCompareFeaturesStore(
		(state) => state.feature1
	);

	const comparisonFeature2 = useCompareFeaturesStore(
		(state) => state.feature2
	);

	function correctLeftViewVariant(): React.ReactNode {
		if (comparisonFeature1 && comparisonFeature2 && props.filteringOnly) {
			return (
				<>
					<GraphView
						features={[comparisonFeature1, comparisonFeature2]}
						allowEscapeViewBox
					/>
					<TableView
						features={[comparisonFeature1, comparisonFeature2]}
					/>
				</>
			);
		}
		if (comparisonFeature1 && comparisonFeature2 && props.differenceOnly) {
			return (
				<>
					<GraphView
						features={getFeatureAsDifferenceOfTwoFeatures(
							comparisonFeature1,
							comparisonFeature2,
							dataset
						)}
						usedOnDifferenceOnlyView
						allowEscapeViewBox
					/>
					<TableView
						features={getFeatureAsDifferenceOfTwoFeatures(
							comparisonFeature1,
							comparisonFeature2,
							dataset
						)}
						usedOnDifferenceOnlyView
					/>
				</>
			);
		}
		if (
			comparisonFeature1 &&
			comparisonFeature2 &&
			props.highlightingAndDifference
		) {
			return (
				<>
					<GraphView
						features={states.features}
						usedOnHighlightingView
						allowEscapeViewBox
					/>
					<TableView
						features={states.features}
						usedOnHighlightingView
					/>
				</>
			);
		} else {
			return (
				<>
					<GraphView features={states.features} allowEscapeViewBox />
					<TableView features={states.features} />
				</>
			);
		}
	}

	return (
		<>
			{showDatasetModal ? (
				<DatasetModal
					showModal={showDatasetModal}
					setShowModal={setShowDatasetModal}
				/>
			) : null}
			<MapContainer
				key={`causesRerender&CursorUpdate${selectionMode}`}
				center={props.center}
				zoom={6}
				style={{
					height: "calc(100vh - 65px)",
					zIndex: 40,
					cursor: selectionMode == true ? "pointer" : "default",
				}}
				keyboard
				minZoom={6}
				maxBounds={props.bounds}
				zoomControl={false}
			>
				<ZoomControl position="bottomright" />
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{states.features.map((state: Feature, index: number) => (
					<MapFeature key={index} feature={state} />
				))}

				<div
					className={`${POSITION_CLASSES.topleft} h-full w-screen pb-8 flex`}
				>
					<div className="w-1/3">{correctLeftViewVariant()}</div>
				</div>
				<div
					className={`${POSITION_CLASSES.topleft} h-full w-screen pb-8 flex`}
				>
					<div className="w-1/3"></div>
					<div className="mx-3 w-1/3 h-fit flex">
						<ComparisonControl />
					</div>
				</div>
				{props.highlightingAndDifference &&
				comparisonFeature1 &&
				comparisonFeature2 ? (
					<div
						className={`${POSITION_CLASSES.topright} h-full w-screen pb-8 flex`}
					>
						<div className="w-2/3"></div>
						<div className="w-1/3">
							<GraphView
								features={getFeatureAsDifferenceOfTwoFeatures(
									comparisonFeature1,
									comparisonFeature2,
									dataset
								)}
								usedOnDifferenceOnlyView
								allowEscapeViewBox={false}
							/>
							<TableView
								features={getFeatureAsDifferenceOfTwoFeatures(
									comparisonFeature1,
									comparisonFeature2,
									dataset
								)}
								usedOnDifferenceOnlyView
							/>
						</div>
					</div>
				) : null}
			</MapContainer>
		</>
	);
}
