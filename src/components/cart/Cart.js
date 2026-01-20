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
      {/* 1. Ajuste do campo de imagem: capaUrl */}
      <Image
        source={{uri: item.capaUrl || 'https://via.placeholder.com/150'}}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <View>
          {/* 2. Ajuste dos nomes: nome e autor */}
          <Text style={styles.title} numberOfLines={2}>
            {item.nome}
          </Text>
          <Text style={styles.author}>{item.autor}</Text>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.id)}>
          <Icon name="trash-outline" size={16} color="#d9534f" />
          <Text style={styles.removeText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📚 Livros no Carrinho</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="cart-outline" size={60} color="#ccc" />
          <Text style={styles.empty}>Seu carrinho está vazio.</Text>
        </View>
      ) : (
        /* O segredo está aqui: a View interna ocupa o espaço entre o Header e o Footer */
        <View style={styles.content}>
          <FlatList
            data={cart}
            renderItem={renderBook}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingBottom: 20}}
            style={{flex: 1}} // Faz a lista crescer até onde der
          />

          {/* O botão fica fixo aqui, logo após o fim da área da lista */}
          <TouchableOpacity style={styles.confirmButton} onPress={confirmRent}>
            <Icon name="checkmark-circle" size={22} color="#fff" />
            <Text style={styles.confirmText}>Confirmar Aluguel</Text>
          </TouchableOpacity>
        </View>
      )}

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f0ee',
  },
  content: {
    flex: 1, // Isso obriga o conteúdo a preencher o espaço antes do Footer
    marginBottom: 70, // Pequena margem para não encostar no Footer
    paddingHorizontal: 16,
  },
  header: {
    padding: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
  },
  image: {width: 70, height: 100, borderRadius: 4},
  info: {flex: 1, marginLeft: 12, justifyContent: 'space-between'},
  title: {fontSize: 16, fontWeight: 'bold', color: '#333'},
  author: {fontSize: 14, color: '#666', marginBottom: 5},
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  removeText: {
    color: '#d9534f',
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  empty: {fontSize: 18, color: '#999', marginTop: 10},
  confirmButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 12, // Menos arredondado para ocupar melhor a largura
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 10, // Garante que não fique colado no Footer
  },
  confirmText: {color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 8},
});

export default Cart;
