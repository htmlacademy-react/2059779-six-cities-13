import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Offer } from '../../mocks/offers';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import 'leaflet/dist/leaflet.css';

type LeafletMapProps = {
	city: Offer;
	offers: Offer[];
	selectedOfferId: string | null;
};

const defaultCustomIcon = new Icon({
	iconUrl: URL_MARKER_DEFAULT,
	iconSize: [40, 40],
	iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
	iconUrl: URL_MARKER_CURRENT,
	iconSize: [40, 40],
	iconAnchor: [20, 40],
});

function LeafletMap({ city, offers, selectedOfferId }: LeafletMapProps): React.JSX.Element {
	const leafletMapRef = useRef(null);
	//Ругается на тип city. Хочет поле name, хотя я же Pick использую. Не понимаю.
	const leafletMap = useMap(leafletMapRef, city);

	useEffect(() => {
		if (leafletMap) {
			const markerLayer = layerGroup().addTo(leafletMap);
			offers.forEach((offer) => {
				const marker = new Marker({
					lat: offer.location.latitude,
					lng: offer.location.longitude
				});

				marker
					.setIcon(
						selectedOfferId !== undefined && offer.id === selectedOfferId
							? currentCustomIcon
							: defaultCustomIcon
					)
					.addTo(markerLayer);
			});

			return () => {
				leafletMap.removeLayer(markerLayer);
			};
		}
	}, [leafletMap, offers, selectedOfferId]);

	return (
		<section ref={leafletMapRef} className="cities__map map" />
	);
}

export default LeafletMap;