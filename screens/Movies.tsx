import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, FlatList } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useQuery } from "react-query";
import { Movie, MovieResponse, moviesApi } from "../api";
import { useQueryClient } from "react-query";
import Loader from "../components/Loader";
import HList from "../components/HList";
import { useState } from "react";

const ListTitle = styled.Text`
  color: white;
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

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

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
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={upcomingData.results}
      ItemSeparatorComponent={HSeparator}
      keyExtractor={movieKeyExtractor}
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
                  backdropPath={movie.backdrop_path || ""}
                  posterPath={movie.poster_path || ""}
                  originalTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                ></Slide>
              ))}
            </Swiper>
            {trendingData ? (
              <HList title="Trending Movies" data={trendingData.results} />
            ) : null}
            <ComingSoonTitle>Coming Soon</ComingSoonTitle>
          </>
        );
      }}
    ></FlatList>
  ) : null;
};

export default Movies;
