import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Movie } from "../api";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  opacity: 0.8;
  width: 80%;
  margin-bottom: 10px;
`;

const Release = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-size: 12px;
  margin-bottom: 10px;
`;

interface HMediaProps {
  poster_path: string;
  original_title: string;
  release_date?: string;
  overview: string;
  vote_average?: number;
  fullData: Movie;
}

const HMedia: React.FC<HMediaProps> = ({
  poster_path,
  original_title,
  release_date,
  overview,
  vote_average,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={poster_path} />
        <HColumn>
          <Title isDark={isDark}>{original_title}</Title>
          {release_date ? (
            <Release isDark={isDark}>
              {new Date(release_date).toLocaleDateString("ko", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Release>
          ) : null}
          <Overview isDark={isDark}>
            {overview !== "" && overview.length > 100
              ? overview.slice(0, 100) + "..."
              : null}
          </Overview>
          {vote_average ? <Votes vote_average={vote_average}></Votes> : null}
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
