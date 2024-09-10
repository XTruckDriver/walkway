"use client";

import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import TravelData from "./inputHelpers/TravelData";

interface DirectionsProps {
  start: string;
  finish: string;
}

const Directions: React.FC<DirectionsProps> = ({ start, finish }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: start,
        destination: finish,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionsRenderer, start, finish]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  const strideLengthMeters: number = 0.76;
  const distanceMeters: number | undefined = selected.legs[0].distance?.value;
  const distanceKM: number = distanceMeters ? distanceMeters / 1000 : 0;
  const steps: number = distanceMeters
    ? distanceMeters / strideLengthMeters
    : 0;
  const calories: number = distanceKM * 40;

  return (
    <>
      <div className="directions">
        <h5>
          <strong>Routes:</strong>
        </h5>

        <ToggleButtonGroup
          defaultValue={0}
          className="routes mt-1 mb-1"
          type="radio"
          name="routes"
          vertical={true}
        >
          {routes.map((route, index) => (
            <ToggleButton
              variant="outline-primary"
              value={index}
              key={index}
              id={`tbg-radio-${index}`}
              onClick={() => setRouteIndex(index)}
            >
              {route.summary}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <TravelData
          journeyData={{
            distance: distanceKM,
            steps: Math.round(steps),
            calories: Math.round(calories),
            time: selected.legs[0].duration?.text || "Unknown",
          }}
        />
      </div>
    </>
  );
};
export default Directions;
