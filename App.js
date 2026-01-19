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
import {DadosProvider} from './src/components/contextData/contextData';
import Search from './src/components/search/Search';
import Library from './src/components/libraryBooks/Library';
import NewBooks from './src/components/newBooks/newBooks';
import bookDetails from './src/components/bookDetails/BookDetails';
import Profile from './src/components/profilePage/profile';
import Cart from './src/components/cart/Cart';
import rentedBooks from './src/components/profilePage/rentedBooks';
import RentalHistory from './src/components/rentalHistory/RentalHistory';
import AddBook from './src/components/addBook/AddBook';
import AdminDashboard from './src/components/AdminPanel/AdminPanel';
import GerenciarLivros from './src/components/AdminPanel/GerenciarLivros';
import editBook from './src/components/EditBook/editBook';
import GerenciarUsuarios from './src/components/AdminPanel/GerenciarUsuarios';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <>
        <DadosProvider>
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
                options={{title: 'Home', headerBackVisible: false}}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{title: 'Buscar', headerBackVisible: false}}
              />
              <Stack.Screen
                name="Library"
                component={Library}
                options={{title: 'Biblioteca', headerBackVisible: false}}
              />
              <Stack.Screen
                name="NewBooks"
                component={NewBooks}
                options={{title: ''}}
              />
              <Stack.Screen
                name="BookDetails"
                component={bookDetails}
                options={{title: 'Detalhes do Livro'}}
              />
              <Stack.Screen
                name="Cart"
                component={Cart}
                options={{title: ''}}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{title: ''}}
              />
              <Stack.Screen
                name="rentedBooks"
                component={rentedBooks}
                options={{title: ''}}
              />
              <Stack.Screen
                name="RentalHistory"
                component={RentalHistory}
                options={{title: ''}}
              />
              <Stack.Screen
                name="AddBook"
                component={AddBook}
                options={{title: 'Adicionar Livro'}}
              />
              <Stack.Screen
                name="AdminPanel"
                component={AdminDashboard}
                options={{title: ''}}
              />
              <Stack.Screen
                name="GerenciarLivros"
                component={GerenciarLivros}
                options={{title: 'Gerenciador de livros'}}
              />
              <Stack.Screen
                name="EditBook"
                component={editBook}
                options={{title: 'Editar Livro'}}
              />
              <Stack.Screen
                name="GerenciarUsuarios"
                component={GerenciarUsuarios}
                options={{title: 'Gerenciador de Usuários'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </DadosProvider>
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
