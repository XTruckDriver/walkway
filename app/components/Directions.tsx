"use client";

import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import Button from "react-bootstrap/Button";
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

  //console.log(`Directions: start = ${start} finish = ${finish}`);
  console.log(`leg = ${selected.legs[0].duration?.value}`);
  console.log("selected : ", selected);

  const strideLengthMeters: number = 0.76;
  const distanceMeters: number = selected.legs[0].distance?.value;
  const distanceKM: number = distanceMeters / 1000;
  const steps: number = distanceMeters / strideLengthMeters;
  const calories: number = distanceKM * 40;

  console.log(`Directions: steps =${steps} calories =${calories}`);

  return (
    <div className="directions">
      <h3>Routes</h3>
      <div className="d-grid gap-2">
        {routes.map((route, index) => (
          <Button
            onClick={() => setRouteIndex(index)}
            key={route.summary}
            variant="primary"
            size="lg"
          >
            {route.summary}
          </Button>
        ))}
      </div>

      <TravelData
        journeyData={{
          distance: distanceKM.toFixed(1),
          steps: Math.round(steps),
          calories: Math.round(calories),
          time: selected.legs[0].duration?.text,
        }}
      />
    </div>
  );
};
export default Directions;
