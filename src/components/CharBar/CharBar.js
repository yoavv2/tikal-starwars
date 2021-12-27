import React from "react";
import * as S from "./style";

function CharBar({ height, name, population }) {
  return (
    <S.ChartBar height={height}>
      <S.Population>{population}</S.Population>
      <S.Name>{name}</S.Name>
    </S.ChartBar>
  );
}

export default CharBar;
