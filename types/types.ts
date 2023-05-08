export type DatasetType = "State" | "Community";

export type Values = YearValuePair[];

export type States = {
	type: string;
	features: Feature[];
};

export type Communities = {
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
	values: YearValuePair;
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

export type YearValuePair = {
	[year: string]: number;
};
