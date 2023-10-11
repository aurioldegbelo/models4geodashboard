export type Dataset =
	| "roadnetworkdensity"
	| "woodlandpercentage"
	| "greenlandpercentage"
	| "agriculturallandpercentage";

export type TransormedData = {
	year: string;
	[name: string]: number | string;
};

export type Side = "left" | "right";

export type States = {
	type: string;
	features: Feature[];
};
export type DifferenceFeature = {
	type: string;
	properties: Properties;
	featureName1: string;
	featureName2: string;
};
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
	roadnetworkdensity: YearValuePairs;
	woodlandpercentage: YearValuePairs;
	greenlandpercentage: YearValuePairs;
	agriculturallandpercentage: YearValuePairs;
};

export type YearValuePairs = Record<YearType, number>;

export type YearType =
	| "2008"
	| "2009"
	| "2010"
	| "2011"
	| "2012"
	| "2013"
	| "2014"
	| "2015"
	| "2016"
	| "2017"
	| "2018"
	| "2019"
	| "2020"
	| "2021"
	| "2022";
