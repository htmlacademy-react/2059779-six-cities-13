import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { TCity, TOffer, TFullOffer } from '../../types/offer';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import 'leaflet/dist/leaflet.css';

type LeafletMapProps = {
	city: TCity;
	offers: TOffer[];
	currentOffer?: TFullOffer;
	selectedOfferId?: string | null;
	className: string;
};

const defaultCustomIcon = new Icon({
	iconUrl: URL_MARKER_DEFAULT,
	iconSize: [28, 40],
	iconAnchor: [14, 40],
});

const currentCustomIcon = new Icon({
	iconUrl: URL_MARKER_CURRENT,
	iconSize: [28, 40],
	iconAnchor: [14, 40],
});

function LeafletMap({ city, offers, selectedOfferId, className, currentOffer }: LeafletMapProps): React.JSX.Element {
	const leafletMapRef = useRef(null);
	const leafletMap = useMap(leafletMapRef, city);

	useEffect(() => {
		leafletMap?.setView(
			{
				lat: city.location.latitude,
				lng: city.location.longitude,
			},city.location.zoom,
		);
	}, [city, leafletMap]);

	useEffect(() => {
		if (leafletMap) {
			const markerLayer = layerGroup().addTo(leafletMap);

			if (currentOffer) {
				const mainMarker = new Marker({
					lat: currentOffer.location.latitude,
					lng: currentOffer.location.longitude
				});

				mainMarker
					.setIcon(currentCustomIcon).addTo(markerLayer);
			}

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
	}, [leafletMap, offers, selectedOfferId, currentOffer]);

	return (
		<section ref={leafletMapRef} className={className} />
	);
}

export default LeafletMap;
