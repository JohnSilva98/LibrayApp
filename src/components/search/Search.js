import React, {useState, useContext} from 'react';
import {View, TextInput, FlatList, Text, Image, StyleSheet} from 'react-native';
import Footer from '../footer/Footer';

import {DadosContext} from '../contextData/contextData';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const {books} = useContext(DadosContext);
  // Função para filtrar livros pelo título ou autor com base no searchText
  const filteredBooks = books.filter(
    book =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar livro por título ou autor"
        placeholderTextColor="#000"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />
      {searchText.length > 0 && (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.filteredBooks}>
              <Image source={{uri: item.image}} style={styles.bookImage} />
              <View style={styles.bookDetails}>
                <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                <Text>{item.author}</Text>
              </View>
            </View>
          )}
        />
      )}

      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#acacabff'},
  input: {
    height: 40,
    color: '#000',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 3,
    margin: 10,
    paddingHorizontal: 10,
  },
  filteredBooks: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  bookImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    color: '#000',
  },
});
export default Search;
