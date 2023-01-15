import * as React from "react";
import EditOptionsMenu from './EditOptionsMenu';
import type { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import EditControlFC from './EditControl';
import "leaflet-draw/dist/leaflet.draw.css";

import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import {cutGeojson} from "../utils/geojsonUtils"
import { Polygon } from "@turf/turf";

function MyMap() {
  const [geojson, setGeojson] = React.useState<FeatureCollection<Geometry, GeoJsonProperties>>({
    type: 'FeatureCollection',
    features: [
    ],
  });
  const [showEditControl, setShowEditControl] = React.useState(true);
  const [color, setColor] = React.useState({ fillColor: "", fillOpacity: 0.2 });
  const colorRef = React.useRef(color);

  const onColorChange = (color: string) => {
    setColor({ fillColor: color, fillOpacity: 1 });
    colorRef.current = { fillColor: color, fillOpacity: 1 };
  };
  
  const gridModuleStyle: L.PathOptions = {
    color: "black",
    dashArray: "1", // we get bordered dashes
  };
  
  const setStyleOnClick = (event: L.LeafletEvent, color: L.PathOptions) => {
    if (color.fillColor === "") {alert("Please set up treatment zones")}
    event.target.setStyle(color);
  }
  
  const onEachFeature = (_: any, layer: L.Layer) => {

    layer.on({
      click: (event: L.LeafletEvent) => setStyleOnClick(event, colorRef.current)
    });
  }
  function onSetButtonClick() {
    
    if (geojson.features.length !== 1 || geojson.features.every(feature => feature.geometry.type !== 'Polygon')) {
      alert('Please draw one polygon (at least and maximum)');
    } else {
      
      const grid = cutGeojson(geojson.features[0].geometry as Polygon,1/11_111)
      console.log(geojson)
      console.log(grid)
      setGeojson(cutGeojson(geojson.features[0].geometry as Polygon,1/11_111) as FeatureCollection<Geometry, GeoJsonProperties>);
      setShowEditControl(false);
    }
  }

  return (
    
    <div>
      <h1 style={{ textAlign: "center" }}>Edit the GeoJSON</h1>
      <h2>{color.fillColor}</h2>
      

      <MapContainer
        style={{ height: "80vh", width: "70vh", marginLeft: "15vh", marginRight:"20vh" }}
        zoom={17}
        center={[50.56862063790635, 9.79568103987568]}
      >
        { showEditControl ?
        <EditControlFC geojson={geojson} setGeojson={setGeojson} />
        :
        <GeoJSON
          style={gridModuleStyle}
          data={(geojson as any).features}
          onEachFeature={onEachFeature}
       
        /> }
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className="left-center">
      {showEditControl && <button onClick={onSetButtonClick}>Set polygon</button>}
      {!showEditControl && <EditOptionsMenu color={color.fillColor} onColorChange={onColorChange} />}
      </div>
    </div>
  );
}

export default MyMap;
