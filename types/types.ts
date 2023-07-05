export type Dataset = 'roadnetworkdensity' | 'woodlandpercentage' | 'greenlandpercentage'


export type States = {
	type: string;
	features: Feature[];
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
	OBJID: string;
	BEGINN: string;
	GF: number;
	NUTS_LEVEL?: number;
	NUTS_CODE?: string;
	NUTS_NAME?: string;
	ADE?: 4;
	BSG?: number;
	ARS?: string;
	AGS?: string;
	SDV_ARS?: string;
	GEN?: string;
	BEZ?: string;
	IBZ?: number;
	BEM?: string;
	NBD?: string;
	SN_L?: string;
	SN_R?: string;
	SN_K?: string;
	SN_V1?: string;
	SN_V2?: string;
	SN_G?: string;
	FK_S3?: string;
	NUTS?: string;
	ARS_0?: string;
	AGS_0?: string;
	WSK?: string;
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
