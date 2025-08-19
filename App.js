import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Image} from 'react-native';
import Header from './src/components/header/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
    };
    this.getNome = this.getNome.bind(this);
  }

  getNome(text) {
    this.setState({nome: text});
  }
  render() {
    return (
      <View style={styles.container}>
        <Header />
      </View>
    );
  }
}
// Paleta simples para manter o visual consistente.
const COLORS = {
  bg: '#f1f0ee', // fundo "papel" clarinho
  text: '#111111', // texto principal
  subtext: '#777777', // texto secundário
  accent: '#ffb703', // destaque (linha de progresso)
  dark: '#0f0f10', // fundo da bottom bar
  cardShadow: '#00000022', // sombra leve
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg,
    flex: 1,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#222',
    margin: 10,
    fontSize: 20,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profilePhoto: {
    height: 100,
    width: 100,
  },
});

export default App;
