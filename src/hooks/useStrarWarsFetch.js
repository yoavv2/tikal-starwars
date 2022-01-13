import { useState, useEffect, useMemo } from "react";
import axios from "axios";
export const useStarWarsFetch = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useMemo(() => fetchPilots(), [vehicles]);

  async function fetchVehicles() {
    setIsLoading(true);
    const response1 = await axios.get(`https://swapi.dev/api/vehicles/?page=1`);
    const response2 = await axios.get(`https://swapi.dev/api/vehicles/?page=2`);
    const response3 = await axios.get(`https://swapi.dev/api/vehicles/?page=3`);
    const response4 = await axios.get(`https://swapi.dev/api/vehicles/?page=4`);

    setVehicles([
      ...response1.data.results,
      ...response2.data.results,
      ...response3.data.results,
      ...response4.data.results,
    ]);
  }

  async function fetchPilots() {
    const vePromises = vehicles.map(async (v) => {
      if (v.pilots.length) {
        const promises = v.pilots.map(async (p) => await axios.get(p));

        const responseArray = await Promise.all(promises);

        v.pilots = responseArray.map(({ data: pilot }) => pilot);
        const homeWorldPromises = v.pilots.map(async (pilot) => {
          if (pilot.homeworld) {
            const { data } = await axios.get(pilot.homeworld);
            pilot.homeworld = data;
          }
        });
        await Promise.all(homeWorldPromises);
      }
    });
    await Promise.all(vePromises);

    setIsLoading(false);
    console.log(vehicles);
  }

  return { vehicles, isLoading, fetchVehicles};
};
