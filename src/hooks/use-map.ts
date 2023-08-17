import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Map as leaflet, TileLayer } from 'leaflet';
import type { TCity } from '../types/offer';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: TCity): leaflet | null {
	const { location } = city;
	const [map, setMap] = useState<leaflet | null>(null);
	const isRenderedRef = useRef<boolean>(false);

	useEffect(() => {
		if (mapRef.current !== null && !isRenderedRef.current) {
			const instance = new leaflet(mapRef.current, {
				center: {
					lat: location.latitude,
					lng: location.longitude,
				},
				zoom: location.zoom,
			});

			const layer = new TileLayer(
				'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				{
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				},
			);
			instance.addLayer(layer);

			setMap(instance);
			isRenderedRef.current = true;
		}
	}, [mapRef, location]);

	return map;
}

export default useMap;
