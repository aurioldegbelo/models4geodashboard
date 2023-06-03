import { communities } from "../data/communities";
import { states } from "../data/states";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { Feature } from "@/types/types";
import { useDatasetStore } from "@/store/selectedDatasetStore";
import TableView from "./TableView";
import DatasetControl from "./DatasetControl";
import YearControl from "./YearControl";
import GraphView from "./GraphView";
import MapFeature from "./MapFeature";
import PrimaryButton from "./PrimaryButton";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import DetailModal from "./DetailModal";

interface Props {
	bounds: number[][];
	center: number[];
	tableView: boolean;
	graphView: boolean;
}

const POSITION_CLASSES = {
	bottomleft: "leaflet-bottom leaflet-left",
	bottomright: "leaflet-bottom leaflet-right",
	topleft: "leaflet-top leaflet-left",
	topright: "leaflet-top leaflet-right",
};

export default function Map(props: Props) {
	const selectedDataset = useDatasetStore((state) => state.dataset);

	const selectedFeature = useSelectedFeatureStore((state) => state.feature);

	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<>
			{showModal ? (
				<DetailModal
					feature={selectedFeature}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			) : null}
			<MapContainer
				center={props.center}
				zoom={6}
				style={{ height: "calc(100vh - 65px)", zIndex: 40 }}
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

				{selectedDataset == "State"
					? states.features.map((state: Feature, index) => (
							<>
								<MapFeature
									feature={state}
									index={index}
									setShowModal={setShowModal}
								/>
							</>
					  ))
					: null}
				{selectedDataset == "Community"
					? communities.features.map((community, index) => (
							<>
								<MapFeature
									feature={community}
									index={index}
									setShowModal={setShowModal}
								/>
							</>
					  ))
					: null}

				<div className={`${POSITION_CLASSES.topright} leaflet-control`}>
					<YearControl />
				</div>

				<div className={`${POSITION_CLASSES.topright} mr-32`}>
					<DatasetControl />
				</div>
				<div
					className={`${POSITION_CLASSES.topleft} h-full w-screen space-y-3 pb-8`}
				>
					{props.tableView ? (
						<div className={`h-1/2`}>
							<TableView
								features={
									selectedDataset == "State"
										? states.features
										: communities.features
								}
							/>
						</div>
					) : null}
					{props.graphView ? (
						<div className="h-1/2">
							<GraphView />
						</div>
					) : null}
				</div>
			</MapContainer>
		</>
	);
}
