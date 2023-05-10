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
				[58.0, 27.0],
				[42.0, -5.0],
			]}
			center={[51.5, 10.5]}
			tableView={false}
			graphView={false}
		/>
	);
}
