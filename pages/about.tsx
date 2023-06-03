import TableView from "@/components/TableView";
import { communities } from "../data/communities";
import { states } from "../data/states";
import { useDatasetStore } from "@/store/selectedDatasetStore";
import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import DetailModal from "@/components/DetailModal";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";

export default function about() {
	const selectedFeature = useSelectedFeatureStore((state) => state.feature);

	const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

	return (
		<div className="flex justify-center">
			<PrimaryButton onClick={() => setDetailsOpen(true)}>
				Open
			</PrimaryButton>
			<DetailModal
				showModal={detailsOpen}
				setShowModal={setDetailsOpen}
				feature={selectedFeature}
			/>
		</div>
	);
}
