import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";

const Text = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  font-size: 10px;
`;

interface VotesProps {
  vote_average: number;
}

const Votes: React.FC<VotesProps> = ({ vote_average }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Text isDark={isDark}>
      {vote_average > 0 ? `⭐ ${vote_average}/10` : "Coming soon"}
    </Text>
  );
};

export default Votes;
