import React, {useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {DadosContext} from '../contextData/contextData';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const {myBooks, returnBook} = useContext(DadosContext);
  const navigation = useNavigation();
  const handleMyBooksPress = () => {
    navigation.navigate('rentedBooks');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Meu Perfil</Text>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1755380549803-c6ab36193884?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0',
          }}
          style={{height: 100, width: 100, borderRadius: 50, marginBottom: 15}}
        />
      </View>
      <View style={styles.profileMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text>👤 Informações do Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('RentalHistory')}>
          <Text>🕓 Histórico de aluguéis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleMyBooksPress}>
          <Text>📚 Meus livros alugados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 20,
    display: 'flex',

    alignItems: 'center',
  },
  title: {
    color: '#111',
    fontSize: 22,
    marginBottom: 15,
  },
  profileMenu: {marginTop: 30, width: '100%'},
  menuItem: {
    padding: 15,
    backgroundColor: '#b5b5b5ff',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Profile;
