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
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BookDetails', {book: item})}>
        <Text style={styles.buttonText}>✏ Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BookDetails', {book: item})}>
        <Text style={styles.buttonText}>🗑 Deletar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todos os Livros</Text>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderBook}
        contentContainerStyle={styles.listContainer}
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
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 12,
    padding: 5,
    marginBottom: 15,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  bookImage: {
    width: 50,
    height: 75,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  bookAuthor: {
    display: 'flex',
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#f09813ff',
    borderRadius: 8,
    marginHorizontal: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default BooksScreen;
