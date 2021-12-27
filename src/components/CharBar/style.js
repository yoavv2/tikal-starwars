import styled from "styled-components";

export const ChartBar = styled.div`
  position: relative;
  background-color: #0f140b;

  width: 120px;
  height: ${(props) => props.height * 70}%;
  background-image: url(Star_Wars_logo.svg);
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.8;
`;
export const Name = styled.h3`
  position: absolute;

  display: flex;
  justify-content: center;
  bottom: -50px;
  left: 0px;
  right: 0px;

  color: #fff;
`;
export const Population = styled.h2`
  position: absolute;
  top: -50px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  color: #fff;
`;
