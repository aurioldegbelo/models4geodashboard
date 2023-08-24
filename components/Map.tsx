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

	const compareFeatureState = useCompareFeaturesStore(
		(state) => state.compareFeatureState
	);
	const comparisonFeature1 = useCompareFeaturesStore(
		(state) => state.feature1
	);
	const comparisonFeature2 = useCompareFeaturesStore(
		(state) => state.feature2
	);
	const comparisonFeature3 = useCompareFeaturesStore(
		(state) => state.feature3
	);

	function correctLeftViewVariant(): React.ReactNode {
		if (
			comparisonFeature1 &&
			comparisonFeature2 &&
			comparisonFeature3 == undefined &&
			compareFeatureState == "Comparison"
		) {
			let features = [];
			if (props.filteringOnly) {
				features = [comparisonFeature1, comparisonFeature2];
			} else if (props.differenceOnly) {
				features = [
					getFeatureAsDifferenceOfTwoFeatures(
						comparisonFeature1,
						comparisonFeature2,
						dataset
					),
				];
				console.log(features);
			} else {
				features = states.features;
			}

			return (
				<>
					<GraphView
						features={features}
						allowEscapeViewBox
						usedOnDifferenceOnlyView={props.filteringOnly}
						usedOnHighlightingView={props.highlightingAndDifference}
					/>
					<TableView
						features={features}
						usedOnDifferenceOnlyView={props.filteringOnly}
						usedOnHighlightingView={props.highlightingAndDifference}
					/>
				</>
			);
		}
		if (
			comparisonFeature1 &&
			comparisonFeature2 &&
			comparisonFeature3 &&
			compareFeatureState == "Comparison"
		) {
			let features = [];
			if (props.filteringOnly) {
				features = [
					comparisonFeature1,
					comparisonFeature2,
					comparisonFeature3,
				];
			} else if (props.differenceOnly) {
				features = [
					getFeatureAsDifferenceOfTwoFeatures(
						comparisonFeature1,
						comparisonFeature2,
						dataset
					),
					getFeatureAsDifferenceOfTwoFeatures(
						comparisonFeature1,
						comparisonFeature3,
						dataset
					),
					getFeatureAsDifferenceOfTwoFeatures(
						comparisonFeature2,
						comparisonFeature3,
						dataset
					),
				];
			} else {
				features = states.features;
			}

			return (
				<>
					<GraphView
						features={features}
						allowEscapeViewBox
						usedOnDifferenceOnlyView={props.differenceOnly}
						usedOnHighlightingView={props.highlightingAndDifference}
					/>
					<TableView
						features={features}
						usedOnDifferenceOnlyView={props.differenceOnly}
						usedOnHighlightingView={props.highlightingAndDifference}
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
				key={`causesRerender&CursorUpdate${compareFeatureState}`}
				center={props.center}
				zoom={6}
				style={{
					height: "calc(100vh - 65px)",
					zIndex: 40,
					cursor:
						compareFeatureState == "Selection"
							? "pointer"
							: "default",
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
				comparisonFeature2 &&
				comparisonFeature3 &&
				compareFeatureState == "Comparison" ? (
					<div
						className={`${POSITION_CLASSES.topright} h-full w-screen pb-8 flex`}
					>
						<div className="w-2/3"></div>
						<div className="w-1/3">
							<GraphView
								features={[
									getFeatureAsDifferenceOfTwoFeatures(
										comparisonFeature1,
										comparisonFeature2,
										dataset
									),
									getFeatureAsDifferenceOfTwoFeatures(
										comparisonFeature1,
										comparisonFeature3,
										dataset
									),
									getFeatureAsDifferenceOfTwoFeatures(
										comparisonFeature2,
										comparisonFeature3,
										dataset
									),
								]}
								usedOnHighlightingView
								allowEscapeViewBox={false}
								side="right"
							/>
							<TableView
								features={[
									getFeatureAsDifferenceOfTwoFeatures(
										comparisonFeature1,
										comparisonFeature2,
										dataset
									),
									getFeatureAsDifferenceOfTwoFeatures(
										comparisonFeature1,
										comparisonFeature3,
										dataset
									),
									getFeatureAsDifferenceOfTwoFeatures(
										comparisonFeature2,
										comparisonFeature3,
										dataset
									),
								]}
								usedOnHighlightingView
								side="right"
							/>
						</div>
					</div>
				) : null}
				{props.highlightingAndDifference &&
				comparisonFeature1 &&
				comparisonFeature2 &&
				comparisonFeature3 == undefined &&
				compareFeatureState == "Comparison" ? (
					<div
						className={`${POSITION_CLASSES.topright} h-full w-screen pb-8 flex`}
					>
						<div className="w-2/3"></div>
						<div className="w-1/3">
							<GraphView
								features={[
									getFeatureAsDifferenceOfTwoFeatures(
										comparisonFeature1,
										comparisonFeature2,
										dataset
									),
								]}
								usedOnHighlightingView
								allowEscapeViewBox={false}
								side="right"
							/>
							<TableView
								features={[
									getFeatureAsDifferenceOfTwoFeatures(
										comparisonFeature1,
										comparisonFeature2,
										dataset
									),
								]}
								usedOnDifferenceOnlyView
								side="right"
							/>
						</div>
					</div>
				) : null}
			</MapContainer>
		</>
	);
}
