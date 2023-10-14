import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
	loading: () => <Loader />,
	ssr: false,
});

const V1 = () => {
	return (
		<MapWithNoSSR
			bounds={[
				[58.0, 40.0],
				[40.0, -20.0],
			]}
			center={[51.5, 10.0]}
			filtering={true}
			highlighting_1={false}
			highlighting_2={false}
			difference={false}
		/>
	);
};

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
			// Will be passed to the page component as props
		},
	};
}

export default V1;
