import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";

export default function ComparisonControl() {
	const comparisonFeature1 = useCompareFeaturesStore(
		(state) => state.feature1
	);
	const setComparisonFeature1 = useCompareFeaturesStore(
		(state) => state.setFeature1
	);
	const comparisonFeature2 = useCompareFeaturesStore(
		(state) => state.feature2
	);
	const setComparisonFeature2 = useCompareFeaturesStore(
		(state) => state.setFeature2
	);
	const selectionMode = useCompareFeaturesStore(
		(state) => state.selectionMode
	);
	const setSelectionMode = useCompareFeaturesStore(
		(state) => state.setSelectionMode
	);
	const handleStopComparisonProcess = () => {
		setComparisonFeature1(undefined)
		setComparisonFeature2(undefined)
		setSelectionMode(false)
	}
	return (
		<>
			<div className="leaflet-control bg-white rounded-lg w-52">
				{selectionMode == false ? (
					<div
						className="flex items-center justify-center cursor-pointer text-md font-semibold w-full rounded-lg h-10 border-2 bg-white text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-white hover:bg-indigo-100 hover:ring-offset-indigo-600 hover:text-indigo-900 hover:ring-indigo-600 hover:border-indigo-600"
						onClick={() => setSelectionMode(true)}
					>
						Start Comparison Process
					</div>
				) : (
					<div
						className="flex items-center justify-center cursor-pointer text-md font-semibold w-full rounded-lg h-10 border-2 bg-white text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-white hover:bg-indigo-100 hover:ring-offset-indigo-600 hover:text-indigo-900 hover:ring-indigo-600 hover:border-indigo-600"
						onClick={() => handleStopComparisonProcess()}
					>
						Stop Comparison Process
					</div>
				)}
				{selectionMode == true ? (
					<div className="absolute mt-1 p-2 w-52 rounded-md bg-white text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm flex flex-wrap gap-1">
						{comparisonFeature1 == undefined &&
						comparisonFeature2 == undefined ? (
							<p>
								Please select features by clicking on
								them on the map
							</p>
						) : null}
						{comparisonFeature1 != undefined ? (
							<p className="bg-indigo-300 px-2 py-1 rounded-xl text-indigo-800 w-fit">
								{comparisonFeature1.properties.NUTS_NAME}
							</p>
						) : null}
						{comparisonFeature2 != undefined ? (
							<p className="bg-indigo-300 px-2 py-1 rounded-xl text-indigo-800 w-fit">
								{comparisonFeature2.properties.NUTS_NAME}
							</p>
						) : null}
					</div>
				) : null}
			</div>
		</>
	);
}
