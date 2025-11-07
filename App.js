// importação de libs

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// importação das paginas do app
import HomeScreen from './src/components/homeScreen/HomeScreen';
import Splash from './src/components/splashScreen/splash';
import LoginScreen from './src/components/login/LoginScreen';
import CreateAccount from './src/components/createAccount/CreateAccount';
import DadosContext from './src/components/contextData/contextData';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    const sharedValue = {DadosProvider: DadosContext};
    return (
      <>
        <DadosContext.Provider value={sharedValue}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{title: 'Login'}}
              />
              <Stack.Screen
                name="CreateAccount"
                component={CreateAccount}
                options={{title: 'Criar Conta'}}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{title: 'Home'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </DadosContext.Provider>
      </>
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
