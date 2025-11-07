import React, {useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import DadosContext from '../contextData/contextData';
import {useNavigation} from '@react-navigation/native';
import Footer from '../footer/Footer';

const BooksScreen = () => {
  const {books} = useContext(DadosContext);
  const navigation = useNavigation();

  const renderBook = ({item}) => (
    <View style={styles.bookCard}>
      <Image source={{uri: item.image}} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>{item.author}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BookDetails', {book: item})}>
        <Text style={styles.buttonText}>Ver detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todos os Livros</Text>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={renderBook}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f0ee',
    paddingHorizontal: 10,
    paddingBottom: 80, // espaço pro footer
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginVertical: 15,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 100,
  },
  bookCard: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#f08c13',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default BooksScreen;
