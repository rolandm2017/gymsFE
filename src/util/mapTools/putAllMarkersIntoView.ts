import mapboxgl from "mapbox-gl";

export function putAllMarkersIntoView(markers: mapboxgl.Marker[], map: mapboxgl.Map): void {
    var bounds = new mapboxgl.LngLatBounds();

    const latitudes: number[] = [];
    const longitudes: number[] = [];
    markers.forEach(function (marker) {
        const coords = marker.getLngLat();
        latitudes.push(coords.lat);
        longitudes.push(coords.lng);
        bounds.extend(coords);
    });
    const minLat = Math.min(...latitudes);
    const minLong = Math.min(...longitudes);
    const maxLat = Math.max(...latitudes);
    const maxLong = Math.max(...longitudes);
    const fitBoundsPadding = 0.006;
    map.fitBounds([
        [minLong - fitBoundsPadding, minLat - fitBoundsPadding],
        [maxLong + fitBoundsPadding, maxLat + fitBoundsPadding],
    ]);
}
