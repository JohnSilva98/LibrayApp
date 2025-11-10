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

const Cart = () => {
  const {cartItems} = useContext(DadosContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Carrinho</Text>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#111',
  },
});

export default Cart;
