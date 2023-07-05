import { Dataset, Feature, YearType } from "@/types/types";

export function getCorrectColor(feature: Feature, year: YearType, dataset: Dataset) {

	switch (dataset) {
		case "roadnetworkdensity":
			return roadNetworkDensityColors(feature, year);
		case "greenlandpercentage":
			return greenLandPercentageColors(feature, year);
		case "woodlandpercentage":
			return woodLandPercentageColors(feature, year);
	}
}

function roadNetworkDensityColors(feature: Feature, year: YearType) {
	const value = feature.properties.values.roadnetworkdensity[`${year}`];

	switch (true) {
		case value < 1 && value >= 0:
			return "#fee5d9";
		case value < 2 && value >= 1:
			return "#fcae91";
		case value < 3 && value >= 2:
			return "#fb6a4a";
		case value < 4 && value >= 3:
			return "#de2d26";
		case value >= 4:
			return "#a50f15";
		default:
			return "#fee5d9";
	}
}

function greenLandPercentageColors(feature: Feature, year: YearType) {
	const value = feature.properties.values.greenlandpercentage[`${year}`];

	switch (true) {
		case value < 12 && value >= 0:
			return "#dcedc8";
		case value < 13 && value >= 12:
			return "#c5e1a5";
		case value < 14 && value >= 13:
			return "#aed581";
		case value < 15 && value >= 14:
			return "#9ccc65";
		case value < 16 && value >= 15:
			return "#8bc34a";
		case value < 19 && value >= 16:
			return "#7cb342";
		case value >= 19:
			return "#689f38";
	}
}

function woodLandPercentageColors(feature: Feature, year: YearType) {
	const value = feature.properties.values.woodlandpercentage[`${year}`];

	switch (true) {
		case value < 12 && value >= 0:
			return "#c8e6c9";
		case value < 20 && value >= 12:
			return "#a5d6a7";
		case value < 24 && value >= 20:
			return "#81c784";
		case value < 30 && value >= 24:
			return "#66bb6a";
		case value < 36 && value >= 30:
			return "#4caf50";
		case value < 40 && value >= 36:
			return "#43a047";
		case value >= 40:
			return "#388e3c";
	}
}
