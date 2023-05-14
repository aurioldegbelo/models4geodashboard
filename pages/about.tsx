import TableView from "@/components/TableView";
import { communities } from "../data/communities";
import { states } from "../data/states";
import { useDatasetStore } from "@/store/selectedDatasetStore";


export default function about() {
	const selectedDataset = useDatasetStore((state) => state.dataset);


	return (
		<div className="">
			<TableView
				features={
					selectedDataset == "State"
						? states.features
						: communities.features
				}
			/>
		</div>
	);
}
