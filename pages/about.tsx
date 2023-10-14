import Card from "@/components/Card";
import DatasetControl from "@/components/DatasetControl";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next'

const about = () => {

	const { t } = useTranslation('common')

	return (
		<div className="w-screen flex justify-center">
			<Card className="mt-16 w-2/3">
				<div>
					<p className="font-bold text-lg mb-5">Settings</p>
					<div className="flex items-center">
						<div className="w-1/4 space-y-10">
							{/* <div>
								<p>Log user activity:</p>
								<p className="text-xs">(Development only)</p>
							</div> */}
							<p>Selected dataset:</p>
						</div>
						<div className="w-2/4 space-y-10">
							{/* <LogUserActivitySwitch /> */}
							<DatasetControl />
						</div>
					</div>
					<p className="font-bold text-lg mt-10">Purpose</p>
					<p>
						This work provides the implementation part of my
						bachelor-thesis. It was used to conduct a study about
						different interface designs in the context of
						geodashboards. More specifically it was about the
						particular interaction strategy of comparison. One wants
						to know the differences between two spatial features of
						the dataset. What are common interface design to face
						this issue in the context of geodashboards? The
						application provides 6 different approaches for
						comparing two or three spatial features.
					</p>
					<p className="font-bold text-lg mt-10">Data</p>
					<div>
						<p>
							The application uses four different datasets. It was
							required to reduce learning effects for the study
							participants when using the dashboards. All four
							datasets consist of values from the years of 2008 to
							2022. The use of complex spatial-temporal data
							justifies the use of multiple coordinated views. In
							our case: Map, Graph, Table. All datasets are free
							and open to use and were provided by
							<a
								href="https://www.ioer-monitor.de/"
								className="text-indigo-600 hover:underline ml-1"
							>
								Ioer-Monitor
							</a>
						</p>
						<p>
							The free to use geographic data for the german
							states was provide from the
							<a
								href="https://gdz.bkg.bund.de/index.php/default/digitale-geodaten/verwaltungsgebiete.html"
								className="text-indigo-600 hover:underline ml-1"
							>
								Bundesamt für Kartographie und Geodäsie
							</a>
						</p>
						<div className="mt-10">
							<p className="font-bold text-sm">
								{t('roadnetworkdensity')}
							</p>
							<p>
								Measures the road network density per overall
								land area. It is measured in km/km².
							</p>
							<p className="font-bold mt-2 text-sm">
								Greenland Percentage
							</p>
							<p>
								Measures the share of grassland in total land
								area. It is measured in %.
							</p>
							<p className="font-bold mt-2 text-sm">
								Woodland Percentage
							</p>
							<p>
								Measures the share of woodland in total land
								area. It is measured in %.
							</p>
							<p className="font-bold mt-2 text-sm">
								Agricultural Area Percentage
							</p>
							<p>
								Measures the share of agricultural area in total
								land area. It is measured in %.
							</p>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
			// Will be passed to the page component as props
		},
	};
}

export default about