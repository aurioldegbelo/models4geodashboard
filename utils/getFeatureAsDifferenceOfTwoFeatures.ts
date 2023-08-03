import { Dataset, Feature } from "@/types/types";

export function getFeatureAsDifferenceOfTwoFeatures(feature1: Feature, feature2: Feature, dataset: Dataset): Array<Feature> {

    const differenceFeature: Feature = {
        type: "Feature",
        geometry: feature1.geometry,
        properties: {
          NUTS_NAME: feature1.properties.NUTS_NAME.concat('&').concat(feature2.properties.NUTS_NAME),
          values: feature1.properties.values
        }
      };
    
      Object.keys(feature1.properties.values['greenlandpercentage']).forEach((year) => {
        if (feature2.properties.values['greenlandpercentage'].hasOwnProperty(year)) {
          const difference = feature1.properties.values['greenlandpercentage'][year] - feature2.properties.values['greenlandpercentage'][year];
          differenceFeature.properties.values['greenlandpercentage'][year] = difference;
        }
      });
    
      return [differenceFeature];

}