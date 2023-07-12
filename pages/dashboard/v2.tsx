import Loader from "@/components/Loader";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
	loading: () => <Loader />,
	ssr: false,
});

export default function v2() {
	return (
		<MapWithNoSSR
			bounds={[
				[58.0, 20.0],
				[40.0, -20.0],
			]}
			center={[51.5, 0.0]}
			filtering={false}
			differenceOnly={true}
			filteringAndDifference={false}
		/>
	);
}
