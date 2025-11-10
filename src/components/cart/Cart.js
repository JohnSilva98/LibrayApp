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
import {DadosContext} from '../contextData/contextData';
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from '../footer/Footer';

const Cart = () => {
  const {cart, removeFromCart, confirmRent} = useContext(DadosContext);

  const renderBook = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>

        {item.rentDate && (
          <Text style={styles.dateText}>Alugado em: {item.rentDate}</Text>
        )}
        {item.returnDate && (
          <Text style={styles.dateText}>Devolução: {item.returnDate}</Text>
        )}

        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => removeFromCart(item.id)}>
          <Icon name="trash-outline" size={18} color="#fff" />
          <Text style={{color: '#fff', marginLeft: 6}}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📚 Livros no Carrinho</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Nenhum livro no carrinho.</Text>
      ) : (
        <>
          {/* FlatList com flex menor para sobrar espaço para o botão */}
          <FlatList
            style={{flexGrow: 0}}
            data={cart}
            renderItem={renderBook}
            keyExtractor={(item, index) =>
              item?.id ? item.id.toString() : index.toString()
            }
          />

          {/* Botão de confirmar visível abaixo da lista */}
          <TouchableOpacity style={styles.confirmButton} onPress={confirmRent}>
            <Icon name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.confirmText}>Confirmar Aluguel</Text>
          </TouchableOpacity>
        </>
      )}

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f0ee',
    padding: 16,
    justifyContent: 'flex-start',
  },
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
  dateText: {fontSize: 14, color: '#777'},
  confirmButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    width: '50%',
    alignSelf: 'center',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  confirmText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default Cart;
