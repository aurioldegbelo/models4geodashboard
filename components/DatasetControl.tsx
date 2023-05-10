import { useDatasetStore } from "@/store/selectedDatasetStore";

export default function DatasetControl() {
    const selectedDataset = useDatasetStore((state) => state.dataset);
	const setDataset = useDatasetStore((state) => state.setDataset);

	return (
		<div className="leaflet-control bg-white rounded-xl">
			<div className="flex rounded-lg border-2 space-x-1">
				<div
                    onClick={() => setDataset('State')}
					className={`${
						selectedDataset == "State"
							? "ring-1 ring-indigo-600 ring-opacity-100 ring-offset-1 ring-offset-indigo-600 bg-indigo-100 text-indigo-900"
							: "text-gray-900"
					} relative flex cursor-pointer rounded-l-lg px-3 py-2 focus:outline-none w-28 items-center justify-center font-medium text-sm`}
				>
					States
				</div>
				<div
                    onClick={() => setDataset('Community')}
					className={`${
						selectedDataset == "Community"
							? "ring-1 ring-indigo-600 ring-opacity-100 ring-offset-1 ring-offset-indigo-600 bg-indigo-100 text-indigo-900"
							: "text-gray-900"
					} relative flex cursor-pointer rounded-r-lg px-3 py-2 focus:outline-none w-28 items-center justify-center font-medium text-sm`}
				>
					Communities
				</div>
			</div>
		</div>
	);
}
