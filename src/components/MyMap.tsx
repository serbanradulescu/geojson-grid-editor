import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import "leaflet-draw/dist/leaflet.draw.css";

import * as React from "react";

import EditOptionsMenu from "./EditOptionsMenu";
import EditControlFC from "./EditControl";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import { cutGeojson, downloadGeoJSON } from "../utils/geojsonUtils";
import { Polygon } from "@turf/turf";

function MyMap() {
  const [geojson, setGeojson] = React.useState<
    FeatureCollection<Geometry, GeoJsonProperties>
  >({
    type: "FeatureCollection",
    features: [],
  });
  const [showEditControl, setShowEditControl] = React.useState(true);
  const [color, setColor] = React.useState({ fillColor: "", fillOpacity: 0.2 });
  const [rateValue,setRateValue] = React.useState(0);

  const colorRef = React.useRef(color);
  const rateValueRef = React.useRef(rateValue)

  const onColorChange = (color: string, rate:number) => {
    setColor({ fillColor: color, fillOpacity: 1 });
    colorRef.current = { fillColor: color, fillOpacity: 1 };
    setRateValue(rate)
    rateValueRef.current = rate
  };

  const gridModuleStyle: L.PathOptions = {
    color: "black",
    dashArray: "1", // we get bordered dashes
  };

  const setStyleOnClick = (event: L.LeafletEvent, color: L.PathOptions, rate:number) => {
    if (color.fillColor === "") {
      alert("Please set up treatment zones");
    }
    event.target.setStyle(color);
    event.target.feature.properties.rate = rate;
    console.log(rate)
  };

  const onEachFeature = (_: any, layer: L.Layer) => {
    layer.on({
      click: (event: L.LeafletEvent) =>
        setStyleOnClick(event, colorRef.current,rateValueRef.current),
    });
  };
  function onSetButtonClick() {
    if (
      geojson.features.length !== 1 ||
      geojson.features.every((feature) => feature.geometry.type !== "Polygon")
    ) {
      alert("Please draw one polygon (at least and maximum)");
    } else {
      setGeojson(
        cutGeojson(
          geojson.features[0].geometry as Polygon,
          1 / 11_111
        ) as FeatureCollection<Geometry, GeoJsonProperties>
      );
      setShowEditControl(false);
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Edit the GeoJSON</h1>
      <h2>Current color: {color.fillColor}</h2>
      <h2>Current rate: {rateValue}</h2>
      <MapContainer
        style={{
          height: "80vh",
          width: "70vh",
          marginLeft: "15vh",
          marginRight: "20vh",
        }}
        zoom={17}
        center={[50.56862063790635, 9.79568103987568]}
      >
        {showEditControl ? (
          <EditControlFC geojson={geojson} setGeojson={setGeojson} />
        ) : (
          <GeoJSON
            style={gridModuleStyle}
            data={(geojson as any).features}
            onEachFeature={onEachFeature}
          />
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className="left-center">
        {showEditControl && (
          <button onClick={onSetButtonClick}>Set polygon</button>
        )}
        {!showEditControl && (
          <EditOptionsMenu
            color={color.fillColor}
            rate = {rateValue}
            onColorChange={onColorChange}
          />
          
        )}
        <button onClick={() => downloadGeoJSON(geojson)}>Download GeoJSON</button>
      </div>
    </div>
  );
}

export default MyMap;
