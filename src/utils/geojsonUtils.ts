import { FeatureCollection, Feature, Polygon } from 'geojson';
import * as turf from '@turf/turf'

export function cutGeojson (polygon: Polygon, gridSize: number) {
    // Initialize empty feature collection
    const featureCollection = {
        type: 'FeatureCollection',
        features: []
    } as FeatureCollection;

    const minX = Math.min(...polygon.coordinates[0].map((coord)=> coord[0]));
    const minY = Math.min(...polygon.coordinates[0].map((coord)=> coord[1]));
    const maxX = Math.max(...polygon.coordinates[0].map((coord)=> coord[0]));
    const maxY = Math.max(...polygon.coordinates[0].map((coord)=> coord[1]));

    // Iterate through each grid cell that is completely inside of the polygon
    for (let x = minX; x < maxX; x += gridSize) {
        for (let y = minY; y < maxY; y += gridSize) {
            let square: [number, number][][] = [
                [
                    [x, y],
                    [x + gridSize, y],
                    [x + gridSize, y + gridSize],
                    [x, y + gridSize],
                    [x, y]
                ]
            ];
            let squarePolygon = {
                type: "Polygon",
                coordinates: square
            } as Polygon;
            // check if the square is completely inside the polygon
            if (turf.booleanPointInPolygon(squarePolygon.coordinates[0][0], polygon)) {
                const newFeature = {
                    type: 'Feature',
                    properties: {
                        gridX: x,
                        gridY: y
                    },
                    geometry: {
                        type: 'Polygon',
                        coordinates: square
                    }
                } as Feature;
                featureCollection.features.push(newFeature);
            }
        }
    }

    return featureCollection;
}

