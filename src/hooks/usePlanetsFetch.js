import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export const usePlanetsFetch = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetchPlanets();
  }, []);

  async function fetchPlanets() {
    const planets = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];
    const res = await Promise.all(
      planets.map((planet) =>
        axios.get("https://swapi.dev/api/planets/?search=" + planet)
      )
    );
    const data = await Promise.all(res.map((d) => d.data.results[0]));
    setPlanets(data);
  }

  return { fetchPlanets, planets };
};
