import React from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';

const Splash = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Botões de navegação */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Criar Conta"
            onPress={() => navigation.navigate('CreateAccount')}
          />
          <Button
            style={styles.login}
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#240f5aff'},
  content: {alignItems: 'center', justifyContent: 'center', flexGrow: 1},
  buttonsContainer: {
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
    height: 100,
  },
});
export default Splash;
