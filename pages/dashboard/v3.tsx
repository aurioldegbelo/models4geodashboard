import Loader from "@/components/Loader";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
	loading: () => <Loader />,
	ssr: false,
});

export default function v3() {
	return (
		<MapWithNoSSR
			bounds={[
				[58.0, 40.0],
				[40.0, -20.0],
			]}
			center={[51.5, 10.0]}
			filteringOnly={false}
			differenceOnly={false}
			highlightingAndDifference={true}
		/>
	);
}
