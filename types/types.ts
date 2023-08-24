export type Dataset = 'roadnetworkdensity' | 'woodlandpercentage' | 'greenlandpercentage'

export type TransormedData = {
	year: string;
	[name: string]: number | string;
}

export type Side = 'left' | 'right'

export type States = {
	type: string;
	features: Feature[];
};
export type DifferenceFeature = {
	type: string;
	properties: Properties;
	featureName1: string;
	featureName2: string;
}
export type Feature = {
	id?: number;
	type: string;
	geometry: Geometry;
	properties: Properties;
};

export type Geometry = {
	type: string;
	coordinates: Coordinate[][][] | Coordinate[][];
};

export type Coordinate = [number, number];

export type Properties = {
	values: Values;
	NUTS_NAME: string;
};

export type Values = {
	roadnetworkdensity: YearValuePairs,
	woodlandpercentage: YearValuePairs,
	greenlandpercentage: YearValuePairs,
}

export type YearValuePairs = Record<YearType, number>;

export type YearType =
	| "2022"
	| "2021"
	| "2020"
	| "2019"
	| "2018"
	| "2017"
	| "2016"
	| "2015"
	| "2014"
	| "2013"
	| "2012"
	| "2011"
	| "2010"
	| "2009"
	| "2008";
