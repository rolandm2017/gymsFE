import  { LngLatBounds } from "mapbox-gl";
import { IViewportBounds } from "../../interface/ViewportBounds.interface";


export function getMapBounds(boundsOfNewlyCenteredMap: LngLatBounds): IViewportBounds {
    // const boundsOfNewlyCenteredMap: LngLatBounds = map.current.getBounds();
    const neCornerCoords = boundsOfNewlyCenteredMap.getNorthEast();
    const swCornerCoords = boundsOfNewlyCenteredMap.getSouthWest();
    const newBounds: IViewportBounds = {
        sw: { lat: swCornerCoords.lat, long: swCornerCoords.lng },
        ne: { lat: neCornerCoords.lat, long: neCornerCoords.lng },
    };
    return newBounds;
}