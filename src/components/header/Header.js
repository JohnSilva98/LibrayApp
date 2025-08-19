import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const hoje = new Date();

// Nome do dia da semana (qui, sex, etc)
const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const meses = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

const dia = hoje.getDate();
const diaSemana = diasSemana[hoje.getDay()];
const mesAno = `${meses[hoje.getMonth()]} ${hoje.getFullYear()}`;

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <Text style={styles.dia}>{dia}</Text>
          <View style={styles.sub}>
            <Text style={styles.diaSemana}>{diaSemana}</Text>
            <Text style={styles.mesAno}>{mesAno}</Text>
          </View>
        </View>
        <Image
          style={styles.profilePhoto}
          source={{
            uri: 'https://images.unsplash.com/photo-1755380549803-c6ab36193884?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', // joga os itens pros cantos
    alignItems: 'center',
    padding: 8,
    margin: 3,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dia: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  sub: {
    flexDirection: 'column',
  },
  diaSemana: {
    fontSize: 16,
    color: '#777',
  },
  mesAno: {
    fontSize: 16,
    color: '#777',
  },
  profilePhoto: {
    height: 50,
    width: 50,
    borderRadius: 15,
  },
});

export default Header;
