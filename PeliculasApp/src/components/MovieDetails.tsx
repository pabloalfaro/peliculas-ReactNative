import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {MovieFull} from '../interfaces/movieInterface';
import {Cast} from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import {CastItem} from './CastItem';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({movieFull, cast}: Props) => {
  const transformarCantidad = (num: number) => {
    var p = num.toFixed(2).split('.');
    return (
      '$' +
      p[0]
        .split('')
        .reverse()
        .reduce(function (acc, num, i, orig) {
          return num + (num != '-' && i && !(i % 3) ? ',' : '') + acc;
        }, '') +
      '.' +
      p[1]
    );
  };

  return (
    <>
      {/* Detalles */}
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="star-sharp" color="grey" size={16} />
          <Text>{movieFull.vote_average} </Text>

          <Text>
            - {movieFull.genres.map(genero => genero.name).join(', ')}
          </Text>
        </View>

        {/* Sinopsis */}
        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Sinopsis
        </Text>
        <Text style={{fontSize: 16}}>{movieFull.overview}</Text>

        {/* Presupuesto */}
        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Presupuesto
        </Text>
        <Text style={{fontSize: 18}}>
          {transformarCantidad(movieFull.budget)}
        </Text>

        {/* Estreno */}
        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Fecha de estreno
        </Text>
        <Text style={{fontSize: 18}}>{movieFull.release_date}</Text>
      </View>

      {/* Casting */}
      <View style={{marginTop: 10, marginBottom: 100}}>
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Actores
        </Text>
        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <CastItem actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10, height: 70}}
        />
      </View>
    </>
  );
};
