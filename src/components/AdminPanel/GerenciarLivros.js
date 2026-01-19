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
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert} from 'react-native';

const BooksScreen = () => {
  const {books} = useContext(DadosContext);
  const navigation = useNavigation();
  const {deleteBook} = useContext(DadosContext);

  const confirmarExclusao = id => {
    Alert.alert(
      'Confirmar Exclusão', // Título do Alerta
      'Você tem certeza que deseja remover este livro?', // Mensagem
      [
        {
          text: 'Cancelar',
          style: 'cancel', // No iOS, isso destaca o botão como cancelamento
        },
        {
          text: 'Remover',
          onPress: () => deleteBook(id), // Só executa se clicar aqui
          style: 'destructive', // No iOS, deixa o texto em vermelho
        },
      ],
    );
  };

  const renderBook = ({item}) => (
    <View style={styles.bookCard}>
      <Image source={{uri: item.image}} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditBook', {book: item})}>
        <Icon name="pencil-outline" size={18} color="#17ea3aff" />
        <Text style={styles.buttonText}> Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => confirmarExclusao(item.id)}>
        <Icon name="trash-outline" size={18} color="#e21414ff" />
        <Text style={{color: '#000000ff', marginLeft: 6}}> Remover</Text>
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

export default BooksScreen;
