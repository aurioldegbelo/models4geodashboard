import { useDatasetStore } from "@/store/selectedDataSetStore";
import { DatasetType } from "@/types/types";


export default function DatasetMapControl() {
	
	const selectedDataset = useDatasetStore((state) => state.dataset);
	const setDataset = useDatasetStore((state) => state.setDataset);
	
	return (
		<div className="leaflet-control leaflet-bar bg-white p-5">
			<div className="font-bold">Choose Dataset</div>
			<form>
				<div className="flex items-center gap-2">
					<input
						type="radio"
						id="state"
						name="state"
						checked={selectedDataset == "State"}
						onChange={() => setDataset("State")}
					/>
					<label htmlFor="state">States</label>
				</div>
				<div className="flex items-center gap-2">
					<input
						type="radio"
						id="community"
						name="communtiy"
						checked={selectedDataset == "Community"}
						onChange={() => setDataset("Community")}
					/>
					<label htmlFor="community">Communities</label>
				</div>
			</form>
		</div>
	);
}
