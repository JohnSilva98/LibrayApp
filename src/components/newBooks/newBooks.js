import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {DadosContext} from '../contextData/contextData';
import {Dimensions} from 'react-native';

const NewBooks = ({navigation}) => {
  const {books} = useContext(DadosContext);

  const handleBookPress = book => {
    navigation.navigate('BookDetails', {book});
  };

  const screenWidth = Dimensions.get('window').width;

  // filtra apenas os livros novos
  const newBooks = books.filter(book => book.isNew);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Novos Livros</Text>
      </View>

      <FlatList
        data={newBooks}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleBookPress(item)}>
            <BookCard data={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const BookCard = ({data}) => (
  <View
    style={[styles.card, {width: (Dimensions.get('window').width - 30) / 2}]}>
    <Image
      source={{uri: data.image}}
      style={{width: '100%', height: 180, borderRadius: 8, marginBottom: 8}}
      resizeMode="cover"
    />
    <Text style={styles.bookTitle} numberOfLines={2} ellipsizeMode="tail">
      {data.title}
    </Text>
    <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
      {data.author}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f1f0ee', paddingTop: 10},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  title: {fontSize: 24, fontWeight: 'bold', color: '#111'},
  listContainer: {paddingHorizontal: 10, paddingBottom: 100},
  row: {justifyContent: 'space-between', marginBottom: 15},

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 220, // garante altura mínima para alinhar cards
  },
  image: {
    width: '100%', // ajusta à largura do card
    height: 180, // proporcional à imagem
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});
export default NewBooks;
