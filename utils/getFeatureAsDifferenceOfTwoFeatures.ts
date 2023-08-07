import { Dataset, DifferenceFeature, Feature, YearType, YearValuePairs } from "@/types/types";

export function getFeatureAsDifferenceOfTwoFeatures(
	feature1: Feature,
	feature2: Feature,
	dataset: Dataset
): Array<DifferenceFeature> {
	const differenceFeature: DifferenceFeature = {
		type: "Feature",
		featureName1: feature1.properties.NUTS_NAME,
    featureName2: feature2.properties.NUTS_NAME,
		properties: {
			NUTS_NAME: feature1.properties.NUTS_NAME.concat(" - ").concat(
				feature2.properties.NUTS_NAME
			),
			values: {
				roadnetworkdensity: {
					"2008": 0,
					"2009": 0,
					"2010": 0,
					"2011": 0,
					"2012": 0,
					"2013": 0,
					"2014": 0,
					"2015": 0,
					"2016": 0,
					"2017": 0,
					"2018": 0,
					"2019": 0,
					"2020": 0,
					"2021": 0,
					"2022": 0,
				},
				greenlandpercentage: {
					"2008": 0,
					"2009": 0,
					"2010": 0,
					"2011": 0,
					"2012": 0,
					"2013": 0,
					"2014": 0,
					"2015": 0,
					"2016": 0,
					"2017": 0,
					"2018": 0,
					"2019": 0,
					"2020": 0,
					"2021": 0,
					"2022": 0,
				},
				woodlandpercentage: {
					"2008": 0,
					"2009": 0,
					"2010": 0,
					"2011": 0,
					"2012": 0,
					"2013": 0,
					"2014": 0,
					"2015": 0,
					"2016": 0,
					"2017": 0,
					"2018": 0,
					"2019": 0,
					"2020": 0,
					"2021": 0,
					"2022": 0,
				},
			},
		},
	};

	if (
		feature1.properties.values.hasOwnProperty(dataset) &&
		feature2.properties.values.hasOwnProperty(dataset)
	) {
		Object.keys(feature1.properties.values[dataset]).forEach((year) => {
			if (feature2.properties.values[dataset].hasOwnProperty(year)) {
				const difference =
					feature1.properties.values[dataset][year as YearType] -
					feature2.properties.values[dataset][year as YearType];
				differenceFeature.properties.values[dataset][year as YearType] =
					Math.abs(roundFloatNumberToTwoDecimalPlaces(difference));
			}
		});
	}

	return [differenceFeature];
}

export function roundFloatNumberToTwoDecimalPlaces(number: number): number {
	return Math.round(number * 100) / 100;
}
