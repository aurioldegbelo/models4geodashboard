import { communities } from "../data/communities";
import { states } from "../data/states";
import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import DatasetMapControl from "./DatasetMapControl";
import { DatasetType } from "@/types/types";


const POSITION_CLASSES = {
	bottomleft: "leaflet-bottom leaflet-left",
	bottomright: "leaflet-bottom leaflet-right",
	topleft: "leaflet-top leaflet-left",
	topright: "leaflet-top leaflet-right",
};

export default function Map() {
	const [datasetType, setDatasetType] = useState<DatasetType>("State");

	return (
		<MapContainer
			center={[51.0, 10.0]}
			zoom={6}
			style={{ height: "100vh" }}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{datasetType == "State"
				? states.features.map((state, index) => (
						<>
							<GeoJSON data={state.geometry} key={index} />
						</>
				  ))
				: null}
			{datasetType == "Community"
				? communities.features.map((community, index) => (
						<>
							<GeoJSON data={community.geometry} key={index} />
						</>
				  ))
				: null}

			<div className={POSITION_CLASSES.topright}>
				<DatasetMapControl
					datasetType={datasetType}
					setDatasetType={setDatasetType}
				/>
			</div>
		</MapContainer>
	);
}
