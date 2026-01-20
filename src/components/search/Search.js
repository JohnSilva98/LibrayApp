import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Footer from '../footer/Footer';
import {useNavigation} from '@react-navigation/native';
import {DadosContext} from '../contextData/contextData';

const Search = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const {books} = useContext(DadosContext);

  // 1. Ajuste no filtro: Agora usa "nome" e "autor"
  const filteredBooks = books.filter(
    book =>
      (book.nome &&
        book.nome.toLowerCase().includes(searchText.toLowerCase())) ||
      (book.autor &&
        book.autor.toLowerCase().includes(searchText.toLowerCase())),
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar livro por título ou autor"
        placeholderTextColor="#666"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />

      {searchText.length > 0 && (
        <FlatList
          data={filteredBooks}
          keyExtractor={item => item.id.toString()} // 2. ID real do banco
          contentContainerStyle={{paddingBottom: 80}} // Espaço para não ficar atrás do footer
          renderItem={({item}) => (
            /* 3. Colocamos o Touchable em volta de todo o card para facilitar o toque */
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('BookDetails', {book: item})}>
              <Image
                source={{
                  uri: item.capaUrl || 'https://via.placeholder.com/150',
                }}
                style={styles.bookImage}
                resizeMode="contain"
              />
              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {item.nome}
                </Text>
                <Text style={styles.bookAuthor}>{item.autor}</Text>
                <Text style={styles.bookGenre}>{item.genero}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.noResult}>Nenhum livro encontrado.</Text>
          }
        />
      )}

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#f1f0ee'},
  input: {
    height: 50,
    color: '#000',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 25, // Bordas mais arredondadas para um visual moderno
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 4,
  },
  bookDetails: {
    flex: 1,
    paddingLeft: 15,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  bookGenre: {
    fontSize: 12,
    color: '#f08c13',
    marginTop: 4,
    fontStyle: 'italic',
  },
  noResult: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontSize: 16,
  },
});

export default Search;
