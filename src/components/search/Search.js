import React, {useState, useContext} from 'react';
import {View, TextInput, FlatList, Text, Image} from 'react-native';
// import {DadosContext} from '../../context/DadosContext';

const Search = () => {
  const {books} = useContext(DadosContext);
  const [searchText, setSearchText] = useState('');

  // Função para filtrar livros pelo título ou autor com base no searchText
  const filteredBooks = books.filter(
    book =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View>
      <TextInput
        placeholder="Buscar livro por título ou autor"
        value={searchText}
        onChangeText={setSearchText}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          paddingHorizontal: 10,
        }}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item.image}}
              style={{width: 50, height: 50, marginRight: 10}}
            />
            <View>
              <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
              <Text>{item.author}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Search;
