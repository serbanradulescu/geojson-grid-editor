import * as React from "react";
import mapData from "./../data/grid.json";
import EditOptionsMenu from './EditOptionsMenu';

import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

function MyMap() {
  const [color, setColor] = React.useState({ fillColor: "", fillOpacity: 0.2 });
  const colorRef = React.useRef(color);

  const onColorChange = (color: string) => {
    setColor({ fillColor: color, fillOpacity: 1 });
    colorRef.current = { fillColor: color, fillOpacity: 1 };
  };
  
  const gridModuleStyle: L.PathOptions = {
    color: "black",
    //fillOpacity: colorRef.current.fillOpacity,
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
  

  return (
    
    <div>
      <h1 style={{ textAlign: "center" }}>Edit the GeoJSON</h1>
      <h2>{color.fillColor}</h2>
      

      <MapContainer
        style={{ height: "80vh", width: "70vh", marginLeft: "20vh" }}
        zoom={17}
        center={[50.56862063790635, 9.79568103987568]}
      >
        <GeoJSON
          style={gridModuleStyle}
          data={(mapData as any).features}
          onEachFeature={onEachFeature}
          
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className="left-center">
      <EditOptionsMenu color={color.fillColor} onColorChange={onColorChange} />
      </div>
    </div>
  );
}

export default MyMap;
