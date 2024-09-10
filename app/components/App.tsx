"use client";

import React from "react";
import { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { SplitLayout } from "@googlemaps/extended-component-library/react";
import Input from "./Input";
import Directions from "./Directions";

const App: React.FC = () => {
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");

  return (
    <>
      <div className="app-container">
        <APIProvider apiKey={"AIzaSyAl6B9asmXnfqIbw2i7BuF7_2Psc5xeIC8"}>
          <SplitLayout>
            <div className="SlotDiv" slot="fixed">
              <Input setStart={setStart} setFinish={setFinish} />
              <Directions start={start} finish={finish} />
            </div>
            <div className="SplitLayoutContainer" slot="main">
              <Map
                className="map-container"
                center={{ lat: 40, lng: -101 }}
                zoom={4}
              ></Map>
            </div>
          </SplitLayout>
        </APIProvider>
      </div>
    </>
  );
};
export default App;
