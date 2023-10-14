import Card from "@/components/Card";
import DatasetControl from "@/components/DatasetControl";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import LocalesSwitcher from "@/components/LocalesSwitcher";

const About = () => {
	const { t } = useTranslation("common");

	return (
		<div className="w-screen flex justify-center">
			<Card className="mt-16 w-2/3">
				<div>
					<p className="font-bold text-lg mb-5">
						{t("settings.title")}
					</p>
					<div className="flex items-center">
						<div className="w-1/4 space-y-10">
							{/* <div>
								<p>Log user activity:</p>
								<p className="text-xs">(Development only)</p>
							</div> */}
							<p>{t("settings.selectDataset")}</p>
							<p>{t("settings.language")}</p>
						</div>
						<div className="w-2/4 space-y-5 flex flex-col">
							{/* <LogUserActivitySwitch /> */}
							<DatasetControl />
							<LocalesSwitcher />
						</div>
					</div>
					<p className="font-bold text-lg mt-10">
						{t("purpose.title")}
					</p>
					<p>{t("purpose.body")}</p>
					<p className="font-bold text-lg mt-10">{t("data.title")}</p>
					<div>
						<p>
							{t("data.body")}
							<a
								href="https://www.ioer-monitor.de/"
								className="text-indigo-600 hover:underline ml-1"
							>
								Ioer-Monitor
							</a>
						</p>
						<p>
							{t("data.body2")}
							<a
								href="https://gdz.bkg.bund.de/index.php/default/digitale-geodaten/verwaltungsgebiete.html"
								className="text-indigo-600 hover:underline ml-1"
							>
								Bundesamt für Kartographie und Geodäsie
							</a>
						</p>
						<div className="mt-10">
							<p className="font-bold text-sm">
								{t("roadnetworkdensity")}
							</p>
							<p>
								{t("aboutPageDescriptions.roadnetworkdensity")}
							</p>
							<p className="font-bold mt-2 text-sm">
								{t("greenlandpercentage")}
							</p>
							<p>
								{t("aboutPageDescriptions.greenlandpercentage")}
							</p>
							<p className="font-bold mt-2 text-sm">
								{t("woodlandpercentage")}
							</p>
							<p>
								{t("aboutPageDescriptions.woodlandpercentage")}
							</p>
							<p className="font-bold mt-2 text-sm">
								{t("agriculturallandpercentage")}
							</p>
							<p>
								{t(
									"aboutPageDescriptions.agriculturallandpercentage"
								)}
							</p>
						</div>
					</div>
				</div>
			</Card>
		</div>
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

export default About;
