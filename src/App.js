import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useStarWarsFetch, usePlanetsFetch } from "hooks";

import { Table, CharBar } from "components";
//  background-image: url(Star_Wars_logo.svg);
const AppStyle = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;

  background-image: url(https://miukimiu.github.io/star-wars-random-quotes/images/bg.jpg);
  background-size: cover;
  background-repeat: repeat;
`;

const BarCharWrap = styled.div`
  display: flex;
  height: 500px;
  width: 100%;
  align-items: flex-end;
  justify-content: space-evenly;
`;
function App() {
  const { vehicles, isLoading } = useStarWarsFetch();
  const { planets } = usePlanetsFetch();

  const height = useMemo(() => {
    const heighst = planets.reduce(
      (acc, planet) => {
        if (Number(planet.population) < acc.population) {
          return acc;
        }
        return planet;
      },
      { population: 0 }
    );

    const sqroot = (number) => {
      return Math.floor(Math.sqrt(Math.sqrt(Math.sqrt(number))));
    };

    const planetsArray = planets.map(
      (planet) => sqroot(planet.population) / sqroot(heighst.population)
    );

    return planetsArray;
  }, [planets]);

  return (
    <AppStyle className="App">
      {!isLoading && <Table vehicles={vehicles} />}
      <BarCharWrap>
        {planets?.map((planet, i) => (
          <CharBar
            key={i}
            height={height[i]}
            name={planet?.name}
            population={planet?.population}
          />
        ))}
      </BarCharWrap>
    </AppStyle>
  );
}

export default App;
