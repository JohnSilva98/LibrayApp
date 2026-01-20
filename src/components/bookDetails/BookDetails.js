import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Footer from '../footer/Footer';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DadosContext} from '../contextData/contextData';

const BookDetails = () => {
  const route = useRoute();
  const {book} = route.params;
  const navigation = useNavigation();

  const {cart, myBooks, addToCart} = React.useContext(DadosContext);

  // Mapeamento correto das propriedades do Backend
  const isInCart = cart.some(b => b.id === book.id);

  // Verifica se está alugado (ou pelo status vindo do banco ou pela sua lista local)
  const isRented = !book.disponivel || myBooks.some(b => b.id === book.id);

  const handleAddToCart = () => {
    if (!isInCart && !isRented) {
      addToCart(book);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="#111" />
          </TouchableOpacity>
          {/* Mudado de title para nome */}
          <Text style={styles.title}>{book.nome}</Text>
        </View>

        {/* Mudado de image para capaUrl */}
        <Image
          source={{uri: book.capaUrl || 'https://via.placeholder.com/150'}}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.infoContainer}>
          {/* Mudado de author para autor */}
          <Text style={styles.author}>Autor: {book.autor}</Text>

          {/* Mudado de genre para genero */}
          <Text style={styles.genre}>Gênero: {book.genero}</Text>

          <Text style={styles.label}>Sinopse:</Text>
          {/* Mudado de description para descricao */}
          <Text style={styles.description}>
            {book.descricao || 'Nenhuma descrição disponível para este livro.'}
          </Text>
        </View>

        <View style={styles.rentButtonView}>
          <TouchableOpacity
            style={[
              styles.rntButton,
              (isInCart || isRented) && {backgroundColor: '#999'},
            ]}
            onPress={handleAddToCart}
            disabled={isInCart || isRented}>
            <Icon
              name={isRented ? 'lock-closed' : 'cart'}
              size={20}
              color="#fff"
            />
            <Text style={styles.buttonText}>
              {isRented
                ? 'Indisponível'
                : isInCart
                ? 'No Carrinho'
                : 'Adicionar ao Carrinho'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f1f0ee'},
  scrollContent: {padding: 16, paddingBottom: 100}, // Espaço extra para o footer
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginLeft: 12,
    flex: 1,
  },
  image: {width: '100%', height: 300, borderRadius: 12, marginBottom: 20},
  infoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  author: {fontSize: 18, color: '#333', fontWeight: '600', marginBottom: 5},
  genre: {
    fontSize: 14,
    color: '#f08c13',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  label: {fontSize: 16, fontWeight: 'bold', color: '#111', marginTop: 10},
  description: {fontSize: 16, color: '#555', lineHeight: 24, marginTop: 5},
  rentButtonView: {marginTop: 30, alignItems: 'center'},
  rntButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f08c13',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    elevation: 3,
  },
  buttonText: {color: '#fff', marginLeft: 8, fontSize: 16, fontWeight: 'bold'},
});

export default BookDetails;
