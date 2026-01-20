import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [fotoPerfil, setFotoPerfil] = useState(
    'https://res.cloudinary.com/dbmpbrkkq/image/upload/v1768908568/avatar_k7dzee.jpg',
  );

  useEffect(() => {
    const carregarFoto = async () => {
      console.log('=== CARREGANDO FOTO NO HEADER ===');
      const userId = await AsyncStorage.getItem('userId');
      const userName = await AsyncStorage.getItem('userName');
      const userRole = await AsyncStorage.getItem('userRole');
      const fotoSalva = await AsyncStorage.getItem('userPhoto');
      
      console.log('Header - userId:', userId);
      console.log('Header - userName:', userName);
      console.log('Header - userRole:', userRole);
      console.log('Header - userPhoto:', fotoSalva);
      
      if (fotoSalva) {
        setFotoPerfil(fotoSalva);
        console.log('Foto de perfil definida no header');
      } else {
        console.log('Nenhuma foto salva encontrada, usando padrão');
      }
    };

    if (isFocused) {
      carregarFoto();
    }
  }, [isFocused]);

  const hoje = new Date();
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

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.dia}>{dia}</Text>
        <View style={styles.sub}>
          <Text style={styles.diaSemana}>{diaSemana}</Text>
          <Text style={styles.mesAno}>{mesAno}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          style={styles.profilePhoto}
          source={{
            uri: fotoPerfil,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

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
