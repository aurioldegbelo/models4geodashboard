import { communities } from "../data/communities";
import { states } from "../data/states";
import React, { useEffect, useState } from "react";
import {
	MapContainer,
	TileLayer,
	GeoJSON,
	Marker,
	ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { Feature } from "@/types/types";
import { getCorrectColor } from "@/utils/getCorrectColor";
import { useYearStore } from "@/store/selectedYearStore";
import { useDatasetStore } from "@/store/selectedDatasetStore";
import TableView from "./TableView";
import DatasetControl from "./DatasetControl";
import Example from "./YearControl";

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
	const selectedYear = useYearStore((state) => state.year);

	const [scrollEnabled, setScrollEnabled] = useState(true);

	useEffect(() => {}, [scrollEnabled]);

	const style = (feature: Feature) => {
		return {
			fillColor: getCorrectColor(feature, selectedYear),
			weight: 1,
			opacity: 1,
			color: "white",
			dashArray: "0",
			fillOpacity: 0.5,
		};
	};

	function changeScrollBehaviour(bool: boolean) {
		setScrollEnabled(bool);
	}

	return (
		<MapContainer
			center={props.center}
			zoom={6}
			style={{ height: "calc(100vh - 65px)" }}
			keyboard
			minZoom={6}
			maxBounds={props.bounds}
			zoomControl={false}
			scrollWheelZoom={scrollEnabled}
		>
			<ZoomControl position="bottomright" />
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{selectedDataset == "State"
				? states.features.map((state: Feature, index) => (
						<>
							<GeoJSON
								data={state.geometry}
								key={index}
								style={style(state)}
							/>
						</>
				  ))
				: null}
			{selectedDataset == "Community"
				? communities.features.map((community, index) => (
						<>
							<GeoJSON
								data={community.geometry}
								key={index}
								style={style(community)}
							/>
						</>
				  ))
				: null}

			<div className={POSITION_CLASSES.topright}>
				{/* <SelectedYearMapControl /> */}
				<Example />
			</div>
			<div className={`${POSITION_CLASSES.topright} mr-32`}>
				<DatasetControl />
			</div>
			{props.tableView ? (
				<div
					className={`${POSITION_CLASSES.topleft} h-screen w-screen`}
					onMouseEnter={() => {
						console.log(scrollEnabled);
						changeScrollBehaviour(true);
					}}
					onMouseLeave={() => {
						console.log(scrollEnabled);
						changeScrollBehaviour(false);
					}}
				>
					<TableView
						features={
							selectedDataset == "State"
								? states.features
								: communities.features
						}
					/>
				</div>
			) : null}
		</MapContainer>
	);
}
