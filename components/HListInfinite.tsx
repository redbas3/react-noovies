import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import VMedia from "./VMedia";
import { Movie, TV } from "../api";
import { fetchMore, FetchNext } from "../utils";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: Movie[] | TV[];
  hasNext: boolean | undefined;
  fetchNext: FetchNext;
}

const movieKeyExtractor = (item: any) => item.id + "";

const renderVMedia = ({ item }: { item: any }) => (
  <VMedia
    poster_path={item.poster_path || ""}
    original_title={item.original_title ?? item.original_name}
    vote_average={item.vote_average}
    fullData={item}
  ></VMedia>
);

const HListInfinite: React.FC<HListProps> = ({
  title,
  data,
  hasNext,
  fetchNext,
}) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        onEndReached={() => fetchMore(hasNext, fetchNext)}
        onEndReachedThreshold={0.3}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeparator}
        keyExtractor={movieKeyExtractor}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        renderItem={renderVMedia}
      ></FlatList>
    </ListContainer>
  );
};

export default HListInfinite;
