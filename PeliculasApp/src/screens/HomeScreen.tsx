import React, {useContext} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {useMovies} from '../hooks/useMovies';
import {MoviePoster} from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
import {getImageColors} from '../helpers/getColores';
import {GradientContext} from '../context/GradientContext';
import {useEffect} from 'react';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [primary = 'green', secondary = 'blue'] = await getImageColors(uri);

    setMainColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* Carousel principal */}
          <View style={{height: 440}}>
            <Carousel
              data={nowPlaying}
              renderItem={({item}: any) => (
                <MoviePoster movie={item}></MoviePoster>
              )}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.8}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          {/* Películas populares */}
          <HorizontalSlider title="Populares" movies={popular} />
          <HorizontalSlider title="Mejores valoradas" movies={topRated} />
          <HorizontalSlider title="Próximos estrenos" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
