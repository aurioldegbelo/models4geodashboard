import Loader from "@/components/Loader";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
	loading: () => <Loader />,
	ssr: false,
});

export default function v1() {
	return (
		<MapWithNoSSR
			bounds={[
				[58.0, 20.0],
				[40.0, -20.0],
			]}
			center={[51.5, 0.0]}
			filtering={true}
			differenceOnly={false}
			filteringAndDifference={false}
		/>
	);
}
