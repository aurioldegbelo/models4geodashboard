import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
	loading: () => <p>A map is loading</p>,
	ssr: false,
});

export default function v3() {
	return <MapWithNoSSR />;
}
