import { useCallback, useState } from 'react';

//styles
import styles from './index.module.scss';

//icons
import { RiMapPinUserFill } from 'react-icons/ri';
import { BiError } from 'react-icons/bi';

//maps
import { Autocomplete, GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

//vars
const libraries: ('geometry' | 'places' | 'drawing' | 'localContext' | 'visualization')[] = ['places'];

interface IModalProps {
	handler: { [key: string]: (e: any) => void }
}

export function ModalMap({ handler }: IModalProps) {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [location, setLocation] = useState<ILocation>({ lat: 0, lng: 0, loading: true });
	const [point, setPoint] = useState<IPosition | null>();
	const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

	const { isLoaded } = useLoadScript({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY as string,
		libraries
	});

	function getLocation() {
		navigator.geolocation.getCurrentPosition(
			position => setLocation({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
				loading: false,
				error: false
			}),
			error => setLocation((prev: ILocation) => ({ ...prev, loading: false, error: true }))
		);
	}

	async function onClick(e: google.maps.MapMouseEvent) {
		const position = e.latLng?.toJSON() as IPosition;
		setPoint(position);

		const geocoder = new window.google.maps.Geocoder();
		const location = new window.google.maps.LatLng(position.lat, position.lng);

		geocoder.geocode({ location }, (results, status) => {
			if (status === 'OK' && results) {
				const address = results[0].formatted_address;
				handler.handleShip({
					address: address,
					lat: e.latLng?.lat,
					lng: e.latLng?.lng,
				});
			} else {
				console.error(`Geocode error: ${status}`);
			}
		});
	}

	function removeMarker() {
		setPoint(null);
		handler.handleShip(null);
	}

	const onLoadMap = useCallback(function callback(map: google.maps.Map) {
		const bounds = new window.google.maps.LatLngBounds(location);
		map.fitBounds(bounds);
		getLocation();
		setMap(map);
	}, []);

	const onPlaceChanged = () => {
		if (autocomplete !== null) {
			const place = autocomplete.getPlace();
			const position = place.geometry?.location?.toJSON() as IPosition;

			if (!position) return;

			setPoint(position);
			map?.moveCamera({ center: position });
			map?.setZoom(18);
			handler.handleShip({
				address: place.formatted_address,
				lat: position.lat,
				lng: position.lng,
			});
		}
	};

	const onUnmountMap = useCallback(function callback(map: google.maps.Map) {
		setMap(null);
		handler.handleShip(null);
	}, []);

	return isLoaded ? (
		<div className={styles.container}>
			{location.loading || location.error ?
				<div className={styles.status}>
					<div className={`${styles.icon} ${location.loading ? styles.loading : styles.error}`}>
						{location.loading ? <RiMapPinUserFill size={'4.2rem'} /> : <BiError size={'4.2rem'} />}
					</div>
					<p>{location.loading ? 'AGUARDANDO LOCALIZAÇÃO' : 'VOCÊ PRECISA PERMITIR SUA LOCALIZAÇÃO'}</p>
					{location.error ?
						<button onClick={() => getLocation()}>{'PERMITIR'}</button>
						: <></>}
				</div>
				: <></>}
			<Autocomplete
				onLoad={(autocomplete) => setAutocomplete(autocomplete)}
				onPlaceChanged={onPlaceChanged}
			>
				<input
					className={styles.search}
					type={'text'}
					placeholder={'Digite o endereço de entrega'}
					spellCheck={false}
				/>
			</Autocomplete>
			<GoogleMap
				mapContainerStyle={{ width: '100%', height: '100%' }}
				center={location}
				onClick={onClick}
				zoom={15}
				options={{
					controlSize: 24,
					fullscreenControl: false,
					mapTypeControl: false,
					streetViewControl: false,
					maxZoom: 18,
					minZoom: 4,
				}}
				onLoad={onLoadMap}
				onUnmount={onUnmountMap}
			>
				{point ? <Marker position={point} onClick={removeMarker} /> : <></>}
			</GoogleMap>
		</div>
	) : <></>;
}
