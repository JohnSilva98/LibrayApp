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

const NewBooks = ({navigation}) => {
  const {books} = useContext(DadosContext);

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
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('BookDetails', {bookId: item.id})
            }>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

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
    width: '48%',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {width: 100, height: 150, borderRadius: 8, marginBottom: 8},
  bookTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
  author: {fontSize: 14, color: '#555', textAlign: 'center'},
});

export default NewBooks;
