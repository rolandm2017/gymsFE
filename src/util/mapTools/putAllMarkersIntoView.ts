import mapboxgl from "mapbox-gl";

export function putAllMarkersIntoView(markers: mapboxgl.Marker[], map: mapboxgl.Map): void {
    const { minLat, minLong, maxLat, maxLong } = getMinMaxLatLong(markers);
    const fitBoundsPadding = 0.006;
    console.log("making fit view:", [minLong - fitBoundsPadding, minLat - fitBoundsPadding], [maxLong + fitBoundsPadding, maxLat + fitBoundsPadding]);
    map.fitBounds([
        [minLong - fitBoundsPadding, minLat - fitBoundsPadding],
        [maxLong + fitBoundsPadding, maxLat + fitBoundsPadding],
    ]);
}

export function getMinMaxLatLong(markers: mapboxgl.Marker[]): { minLat: number; minLong: number; maxLat: number; maxLong: number } {
    const latitudes: number[] = [];
    const longitudes: number[] = [];
    markers.forEach(function (marker) {
        const coords = marker.getLngLat();
        latitudes.push(coords.lat);
        longitudes.push(coords.lng);
    });
    const minLat = Math.min(...latitudes);
    const minLong = Math.min(...longitudes);
    const maxLat = Math.max(...latitudes);
    const maxLong = Math.max(...longitudes);
    return { minLat, minLong, maxLat, maxLong };
}
