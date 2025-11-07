import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Footer from '../footer/Footer';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const BookDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {book} = route.params; // pegamos o livro passado via navegação

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{book.title}</Text>
      </View>
      <Image source={{uri: book.image}} style={styles.image} />
      <Text style={styles.author}>Autor: {book.author}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <Text style={styles.genre}>Gênero: {book.genre}</Text>
      {/* adicionando o botão de alugar livro */}
      <View style={styles.rentButtonView}>
        <TouchableOpacity style={styles.rntButton}>
          <Icon name="book" size={20} color="#fff" />
          <Text style={{color: '#fff', marginLeft: 8}}>Alugar Livro</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f1f0ee', padding: 16},
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
  title: {fontSize: 24, fontWeight: 'bold', color: '#111', marginLeft: 8},
  image: {width: '100%', height: 200, borderRadius: 12, marginBottom: 12},
  description: {fontSize: 20, color: '#555', lineHeight: 24},
  author: {fontSize: 22, color: '#000', lineHeight: 32},
  genre: {fontSize: 16, color: '#333', lineHeight: 24},
  rentButtonView: {marginTop: 20, alignItems: 'center'},
  rntButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f08c13',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default BookDetails;
