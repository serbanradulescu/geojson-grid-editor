import * as React from "react";
import mapData from "./../data/grid.json";

import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

function MyMap() {
  const [color, setColor] = React.useState({ fillColor: "#ffff00", fillOpacity: 0.25 });
  const colorRef = React.useRef(color);

  const colorChange = (event: any) => {
    console.log("before:", color);
    setColor({ fillColor: event.target.value, fillOpacity: 0.25 });
    colorRef.current = { fillColor: event.target.value, fillOpacity: 0.25 };
    console.log("after:", color);
  };

  const gridModuleStyle = {
    color: "black",
    fillOpacity: 0.25,
    dashArray: "1", // we get bordered dashes
  };
  const setStyleOnClick = (event: any, color: any) => {
    event.target.setStyle(color);
  }
  
  const onEachFeature = (module: any, layer: any) => {
    layer.options.fillOpacity = 0.25;
    layer.on({
      click: (event: any) => setStyleOnClick(event, colorRef.current)
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
      <input type="color" value={color.fillColor} onChange={colorChange} />
    </div>
  );
}

export default MyMap;
