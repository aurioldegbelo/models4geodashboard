import { DatasetType } from "@/types/types";

interface Props {
	datasetType: DatasetType;
	setDatasetType: (DatasetType: DatasetType) => void;
}

export default function DatasetMapControl(props: Props) {
	return (
		<div className="leaflet-control leaflet-bar bg-white p-5">
			<div className="font-bold">Choose Dataset</div>
			<form>
				<div className="flex items-center gap-2">
					<input
						type="radio"
						id="state"
						name="state"
						checked={props.datasetType == "State"}
						onChange={() => props.setDatasetType("State")}
					/>
					<label htmlFor="state">States</label>
				</div>
				<div className="flex items-center gap-2">
					<input
						type="radio"
						id="community"
						name="communtiy"
						checked={props.datasetType == "Community"}
						onChange={() => props.setDatasetType("Community")}
					/>
					<label htmlFor="community">Communities</label>
				</div>
			</form>
		</div>
	);
}
