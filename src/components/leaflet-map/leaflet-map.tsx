import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { City, Offer } from '../../mocks/offers';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import 'leaflet/dist/leaflet.css';

type LeafletMapProps = {
	city: Pick<City, 'location'>;
	offers: Offer[];
	selectedOffer: Offer;
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

function LeafletMap({ city, offers, selectedOffer }: LeafletMapProps): React.JSX.Element {
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
						selectedOffer !== undefined && offer.id === selectedOffer.id
							? currentCustomIcon
							: defaultCustomIcon
					)
					.addTo(markerLayer);
			});

			return () => {
				leafletMap.removeLayer(markerLayer);
			};
		}
	}, [leafletMap, offers, selectedOffer]);

	return (
		<section ref={leafletMapRef} className="cities__map map" />
	);
}

export default LeafletMap;
