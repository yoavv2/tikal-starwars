import React, { useState } from "react";
import * as S from "./style";

function Table({ vehicles, isLoading }) {
  const findeToltalPopulation = (vehiclesArray) => {
    const map = {};

    vehiclesArray.forEach((vehicle, i) => {
      const reducer = vehicle.pilots?.reduce((acc, current) => {
        if (current.homeworld.population === "unknown") return acc;
        return acc + Number(current.homeworld.population);
      }, 0);

      map[i] = reducer;
    });
    const HiestPopulatinNum = Object.keys(map).reduce(
      (acc, key) => {
        if (map[key] > acc.population) {
          return { population: map[key], vehicleIndex: Number(key) };
        }
        return acc;
      },
      { population: 0 }
    );
    return vehiclesArray[HiestPopulatinNum.vehicleIndex];
  };

  console.log(
    `findeToltalPopulation(vehicles)`,
    findeToltalPopulation(vehicles)
  );
  const vehicle = findeToltalPopulation(vehicles);

  return (
    <S.Table>
      <tbody>
        <S.Row>
          <S.Headline>Vehicle name with the largest sum</S.Headline>
          <S.Detail>{vehicle?.name}</S.Detail>
        </S.Row>
        <S.Row>
          <S.Headline>
            Related home planets and their respective population
          </S.Headline>
          <S.Detail>
            {vehicle?.pilots.map((pilot) => (
              <p key={pilot.name}>
                {pilot.homeworld.name + " , " + pilot.homeworld.population}
              </p>
            ))}
          </S.Detail>
        </S.Row>

        <S.Row>
          <S.Headline>Related pilot names</S.Headline>
          <S.Detail>
            {vehicle?.pilots.map((pilot) => (
              <p key={pilot.name}>{pilot.name}</p>
            ))}
          </S.Detail>
        </S.Row>
      </tbody>
    </S.Table>
  );
}

export default Table;
