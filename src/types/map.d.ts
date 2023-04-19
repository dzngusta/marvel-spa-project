declare interface ILocation extends IPosition {
	loading?: boolean;
	error?: boolean;
}

declare interface IPosition {
	lat: number;
	lng: number;
}
