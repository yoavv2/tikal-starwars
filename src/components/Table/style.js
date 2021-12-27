import styled from "styled-components";

export const Table = styled.table`
  margin: 0 auto;
  width: 80%;

  min-width: 300px;
  box-sizing: border-box;
  border-radius: 0.4em;
  overflow: hidden;

  color: #fff;
  background-color: #0f140b;
  opacity: 0.8;
  font-family: Montserrat, sans-serif;
`;

export const Row = styled.tr`
  text-align: left;
  height: 90px;
`;
export const Headline = styled.th`
  color: #dd5;
  font-size: 1.2em;
  font-weight: 900;
`;
export const Detail = styled.td`
  font-size: 1.2em;
  display: block;
`;
