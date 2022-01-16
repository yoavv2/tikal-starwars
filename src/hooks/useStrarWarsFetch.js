import { useState, useEffect, useMemo } from "react";
import axios from "axios";
export const useStarWarsFetch = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (vehicles.length === 0) fetchVehicles();
  }, []);

  useEffect(() => fetchPilots());

  async function fetchVehicles() {
    setIsLoading(true);

    try {
      let res = await axios.get(`https://swapi.dev/api/vehicles`);
      let i = 1;

      while (res.data.next) {
        res = await axios.get(`https://swapi.dev/api/vehicles/?page=${i}`);
        // let arr = [...res.data.results];
        setVehicles((prev) => [...prev, ...res.data.results]);

        i++;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchPilots() {
    const vehiclePromises = vehicles.map(async (vehicle) => {
      if (vehicle?.pilots?.length) {
        const promises = vehicle.pilots.map(
          async (pilot) => await axios.get(pilot)
        );

        const responseArray = await Promise.all(promises);

        vehicle.pilots = responseArray.map(({ data: pilot }) => pilot);
        const homeWorldPromises = vehicle.pilots.map(async (pilot) => {
          if (pilot?.homeworld) {
            const { data } = await axios.get(pilot.homeworld);
            pilot.homeworld = data;
          }
        });
        await Promise.all(homeWorldPromises);
      }
    });
    await Promise.all(vehiclePromises);

    setIsLoading(false);
  }

  return { vehicles, isLoading, fetchVehicles };
};
