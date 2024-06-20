import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "600px",
  height: "400px",
};

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

const MapComponent = ({ origin, destination, waypoints }) => {
  const [response, setResponse] = useState(null);

  const directionsCallback = (res) => {
    if (res !== null) {
      if (res.status === "OK") {
        setResponse(res);
      } else {
        console.error(`error fetching directions ${res}`);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="Removed Api Key For Now">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
        {origin !== "" && destination !== "" && (
          <DirectionsService
            options={{
              origin,
              destination,
              travelMode: "DRIVING",
              waypoints: waypoints.map((stop) => ({
                location: stop,
                stopover: true,
              })),
            }}
            callback={directionsCallback}
          />
        )}
        {response !== null && (
          <DirectionsRenderer
            options={{
              directions: response,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
