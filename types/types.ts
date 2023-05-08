export type DatasetType = "State" | "Community";

export type Values = YearValuePair[];

export type States = {
    type: string,
	features: Feature[]
}

export type Feature = {
    type: string
    geometry: Geometry
    properties: Properties
}

export type Geometry = {
    type: string
    coordinates: Coordinate[][][] | Coordinate[][]
}

export type Coordinate = [number, number]

export type Properties = {
	OBJID: string;
	BEGINN: string;
	GF: number;
	NUTS_LEVEL: number;
	NUTS_CODE: string;
	NUTS_NAME: string;
    values: YearValuePair
};

export type YearValuePair = {
	[year: string]: number;
};
