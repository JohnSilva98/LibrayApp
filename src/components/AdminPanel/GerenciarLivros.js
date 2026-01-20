import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Footer from '../footer/Footer';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert} from 'react-native';

const GerenciarLivros = () => {
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

  // 3. Função de deletar atualizada para API
  const deleteBook = async id => {
    try {
      await axios.delete(`http://10.215.36.185:8080/livros/${id}`);
      Alert.alert('Sucesso', 'Livro removido com sucesso!');
      fetchBooks(); // Recarrega a lista
    } catch (error) {
      Alert.alert('Erro', 'Falha ao deletar o livro no servidor.');
    }
  };

  const confirmarExclusao = (id, nomeLivro) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente remover o livro "${nomeLivro}"?`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Remover',
          onPress: () => deleteBook(id),
          style: 'destructive',
        },
      ],
    );
  };

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

      <View style={{justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditBook', {book: item})}>
          <Icon name="pencil-outline" size={18} color="#17ea3aff" />
          <Text style={styles.buttonText}> Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {marginTop: 5}]}
          onPress={() => confirmarExclusao(item.id, item.nome)}>
          <Icon name="trash-outline" size={18} color="#e21414ff" />
          <Text style={{color: '#000000ff', marginLeft: 6}}> Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todos os Livros ({books.length})</Text>
      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()} // Importante usar o ID do banco
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
    backgroundColor: '#eae9e6ff',
    borderRadius: 8,
    marginHorizontal: 3,
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#000000ff',
    fontWeight: '600',
  },
});

export default GerenciarLivros;
