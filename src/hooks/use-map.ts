import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Map as leaflet, TileLayer } from 'leaflet';
import type { Offer } from '../mocks/offers';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: Offer): leaflet | null {
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
				'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
				{
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
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
