import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
  margin-bottom: 10px;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-bottom: 10px;
`;

interface HMediaProps {
  poster_path: string;
  original_title: string;
  release_date?: string;
  overview: string;
  vote_average?: number;
}

const HMedia: React.FC<HMediaProps> = ({
  poster_path,
  original_title,
  release_date,
  overview,
  vote_average,
}) => {
  return (
    <HMovie>
      <Poster path={poster_path} />
      <HColumn>
        <Title>{original_title}</Title>
        {release_date ? (
          <Release>
            {new Date(release_date).toLocaleDateString("ko", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Release>
        ) : null}
        <Overview>
          {overview !== "" && overview.length > 100
            ? overview.slice(0, 100) + "..."
            : null}
        </Overview>
        {vote_average ? <Votes vote_average={vote_average}></Votes> : null}
      </HColumn>
    </HMovie>
  );
};

export default HMedia;
