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
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from '../footer/Footer';

const Cart = () => {
  const {rentedBooks, returnBook} = useContext(DadosContext);

  const renderBook = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => returnBook(item.id)}>
          <Icon name="arrow-undo" size={18} color="#fff" />
          <Text style={{color: '#fff', marginLeft: 6}}>Devolver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📚 Livros Alugados</Text>
      {rentedBooks.length === 0 ? (
        <Text style={styles.empty}>Nenhum livro alugado.</Text>
      ) : (
        <FlatList
          data={rentedBooks}
          renderItem={renderBook}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <Footer />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f1f0ee', padding: 16},
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {width: 90, height: 120},
  info: {flex: 1, padding: 10, justifyContent: 'space-between'},
  title: {fontSize: 18, fontWeight: 'bold', color: '#333'},
  author: {fontSize: 15, color: '#666'},
  empty: {fontSize: 18, color: '#555', textAlign: 'center', marginTop: 30},
  returnButton: {
    flexDirection: 'row',
    backgroundColor: '#f08c13',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});

export default Cart;
