import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import { Feature, YearType } from "@/types/types";

export function getCorrectColor(feature: Feature, year: YearType) {

	const value = feature.properties.values[`${year}`];

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
