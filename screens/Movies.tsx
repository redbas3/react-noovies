import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, FlatList, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import { useInfiniteQuery, useQuery } from "react-query";
import { Movie, MovieResponse, moviesApi } from "../api";
import { useQueryClient } from "react-query";
import Loader from "../components/Loader";
import HList from "../components/HList";
import HListInfinite from "../components/HListInfinite";
import { useState } from "react";
import { fetchMore } from "../utils";

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
` as unknown as typeof FlatList;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  width: 30px;
`;
const HSeparator = styled.View`
  height: 30px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC = () => {
  const isDark = useColorScheme() === "dark";
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage: upcomingHasNextPage,
    fetchNextPage: upcomingFetchNextPage,
  } = useInfiniteQuery<MovieResponse>(
    ["movies", "upcoming"],
    moviesApi.upcoming,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );
  const {
    isLoading: trendingLoading,
    data: trendingData,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
  } = useInfiniteQuery<MovieResponse>(
    ["movies", "trending"],
    moviesApi.trending,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );

  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  const renderHMedia = ({ item }: { item: Movie }) => (
    <HMedia
      poster_path={item.poster_path || ""}
      original_title={item.original_title}
      release_date={item.release_date}
      overview={item.overview}
      vote_average={item.vote_average}
      fullData={item}
    ></HMedia>
  );
  const movieKeyExtractor = (item: Movie) => item.id + "";

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  // get objets types
  // console.log(Object.keys(nowPlayingData?.results[0]));
  // console.log(Object.keys(nowPlayingData?.results[0]).map((v) => typeof v));

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onEndReached={() => fetchMore(upcomingHasNextPage, upcomingFetchNextPage)}
      onEndReachedThreshold={0.4}
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={upcomingData.pages.map((page) => page.results).flat()}
      ItemSeparatorComponent={HSeparator}
      // keyExtractor={movieKeyExtractor}
      keyExtractor={(item) => item.id + ""}
      renderItem={renderHMedia}
      ListHeaderComponent={() => {
        return (
          <>
            <Swiper
              horizontal
              loop
              autoplay
              autoplayTimeout={3.5}
              showsButtons={false}
              showsPagination={false}
              containerStyle={{
                width: "100%",
                height: SCREEN_HEIGHT / 4,
                marginBottom: 30,
              }}
            >
              {nowPlayingData?.results.map((movie) => (
                <Slide
                  key={movie.id}
                  backdrop_path={movie.backdrop_path || ""}
                  poster_path={movie.poster_path || ""}
                  original_title={movie.original_title}
                  vote_average={movie.vote_average}
                  overview={movie.overview}
                  fullData={movie}
                ></Slide>
              ))}
            </Swiper>
            {trendingData ? (
              <HListInfinite
                title="Trending Movies"
                hasNext={trendingHasNextPage}
                fetchNext={trendingFetchNextPage}
                data={trendingData.pages.map((page) => page.results).flat()}
              />
            ) : null}
            <ComingSoonTitle isDark={isDark}>Coming Soon</ComingSoonTitle>
          </>
        );
      }}
    ></FlatList>
  ) : null;
};

export default Movies;
