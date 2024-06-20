import React, { useState } from "react";
import MapComponent from "./MapComponent";
import grav from "./assets/grav.png";

const Home = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [distance, setDistance] = useState(null);

  const calculateDistance = () => {
    if (!origin || !destination) {
      console.error("Origin and Destination must be provided");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints: waypoints.map((stop) => ({ location: stop })),
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const distance = result.routes[0].legs.reduce(
            (total, leg) => total + leg.distance.value,
            0
          );
          setDistance(`${(distance / 1000).toFixed(2)} kms`);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  const handleAddStop = () => {
    setWaypoints([...waypoints, ""]);
  };

  const handleStopChange = (index, value) => {
    const newWaypoints = [...waypoints];
    newWaypoints[index] = value;
    setWaypoints(newWaypoints);
  };

  return (
    <div className="p-5">
      <img
        src={grav}
        alt="Logo"
        className="h-12 w-auto mb-4"
        style={{ backgroundColor: "#FFFFFF" }}
      />

      <h2 className="text-xl text-blue-600 text-center mb-4">
        Let's calculate{" "}
        <span className="text-blue-900 font-bold ml-1 mr-1">distance</span> from
        Google maps
      </h2>

      <div
        className="grid grid-cols-12 gap-4 "
        style={{ backgroundColor: "#F4F8FA" }}
      >
        {/* Left Column */}
        <div className="col-span-5 flex flex-col pl-14">
          <div className="my-4">
            <label className="block">Origin</label>
            <input
              className="border border-gray-300 rounded p-2 mt-1"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          {waypoints.map((stop, index) => (
            <div key={index} className="my-4">
              <label className="block">Stop {index + 1}</label>
              <input
                className="border border-gray-300 rounded p-2"
                value={stop}
                onChange={(e) => handleStopChange(index, e.target.value)}
              />
            </div>
          ))}
          <button
            className="flex items-center px-3 py-2 border border-gray-400 rounded-full text-gray-700 w-max"
            onClick={handleAddStop}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add another stop
          </button>

          <div className="my-4">
            <label className="block">Destination</label>
            <input
              className="border border-gray-300 rounded p-2"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {distance && (
            <div className="my-4">
              <h3 className="text-2xl">
                Distance:{" "}
                <span className="text-blue-600 font-bold ml-2">{distance}</span>
              </h3>
              <p className="pt-2 text-sm">
                The distance between <b>{origin}</b> and <b>{destination}</b>{" "}
                via the selected route is <b>{distance}</b>.
              </p>
            </div>
          )}
        </div>

        {/* Middle Column */}
        <div className="col-span-2 flex flex-col items-center justify-center pr-96 pb-32">
          <button
            className="bg-blue-800 text-white rounded-2xl py-2 px-4"
            onClick={calculateDistance}
          >
            Calculate
          </button>
        </div>

        {/* Right Column */}
        <div className="col-span-5 flex justify-end pr-14">
          <div className="w-full h-96  ">
            <MapComponent
              origin={origin}
              destination={destination}
              waypoints={waypoints}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
