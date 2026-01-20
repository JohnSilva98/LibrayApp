import React, {useContext, useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Footer from '../footer/Footer';
import axios from 'axios';

const BooksScreen = () => {
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();

  // 1. Função para buscar livros do banco
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://10.215.36.185:8080/livros');
      console.log('DADOS DO BANCO:', response.data[0]);
      setBooks(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os livros do servidor.');
    }
  };
  // 2. Atualiza sempre que você entra na tela
  useFocusEffect(
    useCallback(() => {
      fetchBooks();
    }, []),
  );

  const renderBook = ({item}) => (
    <View style={styles.bookCard}>
      {/* 1. Mantenha item.image se houver, ou use uma imagem padrão se vier vazio */}
      <Image
        source={{
          uri:
            item.capaUrl || 'https://via.placeholder.com/50x75?text=Sem+Capa',
        }}
        style={styles.bookImage}
      />

      <View style={styles.bookInfo}>
        {/* 2. Alterado de item.title para item.nome */}
        <Text style={styles.bookTitle}>{item.nome}</Text>

        {/* 3. item.autor já está correto conforme seu log */}
        <Text style={styles.bookAuthor}>{item.autor}</Text>

        {/* Opcional: Mostrar o gênero que também veio no log */}
        <Text style={{fontSize: 10, color: '#888'}}>{item.genero}</Text>
      </View>
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
