import * as React from "react";
import mapData from "./../data/grid.json";

import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

class MyMap extends React.Component {
  state = { color: "#ffff00" };
  color = "blue";
  gridModuleStyle = {
    fillColor: "yellow",
    fillOpacity: 1,
    color: "black",
    dashArray: "1", // we get bordered dashes
  };

  changeColor = (event: any) => {
    event.target.setStyle({
      color: "black",
      fillColor: this.state.color,
      fillOpacity: 1,
      dashArray: "1",
    });
  };
  private onGridModule(module: any, layer: any) {
    //const moduleValue = module.properties.value;
    //layer.bindPopup(moduleValue);
    console.log(module.type);
    layer.options.fillOpacity = 0.25;
    layer.on({ // mouseOver
      click: this.changeColor,
    });
  }
  colorChange = (event: any) => {
    this.setState({ color: event.target.value });
  };
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Edit the GeoJSON</h1>
        <MapContainer
          style={{ height: "80vh", width:"70vh",marginLeft: "20vh", }}
          zoom={17}
          center={[50.56862063790635, 9.79568103987568]}
        >
          <GeoJSON
            style={this.gridModuleStyle}
            data={(mapData as any).features}
            onEachFeature={this.onGridModule.bind(this)}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        <input
          type="color"
          value={this.state.color}
          onChange={this.colorChange}
        />
      </div>
    );
  }
}

export default MyMap;
