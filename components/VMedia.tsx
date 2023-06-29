import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMedia {
  poster_path: string;
  original_title: string;
  vote_average: number;
}

const VMedia: React.FC<VMedia> = ({
  poster_path,
  original_title,
  vote_average,
}) => {
  return (
    <Movie>
      <Poster path={poster_path} />
      <Title>
        {original_title.length > 8
          ? original_title.slice(0, 8) + "..."
          : original_title}
      </Title>
      <Votes vote_average={vote_average}></Votes>
    </Movie>
  );
};

export default VMedia;
