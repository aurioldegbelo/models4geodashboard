import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";

interface Props {}

export default function OnViewDatasetDescription(props: Props) {
	const dataset = useSelectedDatasetStore((state) => state.dataset);

	return (
		<div className="flex mb-2">
			{dataset == "roadnetworkdensity" && (
				<div className="flex gap-2">
					<h1 className="text-lg">Road network density per area |</h1>
					<small className="self-end pb-1">measured in: km/km²</small>
				</div>
			)}
			{dataset == "greenlandpercentage" && (
				<div className="flex gap-2">
					<h1 className="text-lg">
						Share of grassland in total area |
					</h1>
					<small className="self-end pb-1">measured in: %</small>
				</div>
			)}
			{dataset == "woodlandpercentage" && (
				<div className="flex gap-2">
					<h1 className="text-lg">
						Share of woodland in total area |
					</h1>
					<small className="self-end pb-1">measured in: %</small>
				</div>
			)}
		</div>
	);
}
