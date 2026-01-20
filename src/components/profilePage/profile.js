import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker'; // Reimportado para a foto de perfil
import axios from 'axios';

const Profile = () => {
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState('');
  const [userPhoto, setUserPhoto] = useState(
    'https://res.cloudinary.com/dbmpbrkkq/image/upload/v1768908568/avatar_k7dzee.jpg',
  ); // Foto padrão

  useEffect(() => {
    const loadUserData = async () => {
      const role = await AsyncStorage.getItem('userRole');
      const photo = await AsyncStorage.getItem('userPhoto'); // Tenta pegar a foto salva no login
      setUserRole(role);
      if (photo) setUserPhoto(photo);
    };
    loadUserData();
  }, []);

  // FUNÇÃO PARA TROCAR A FOTO
  const handleEditPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.didCancel) return;

    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      uploadPhoto(selectedImage);
    }
  };

  // ENVIO PARA O BACKEND (Cloudinary via Java)
  const uploadPhoto = async imageFile => {
    try {
      const userId = await AsyncStorage.getItem('userId'); // Você vai precisar salvar o ID no login
      const formData = new FormData();
      formData.append('image', {
        uri: imageFile.uri,
        type: imageFile.type,
        name: `profile_${userId}.jpg`,
      });

      // Rota que vamos criar no Java
      const response = await axios.post(
        `http://10.215.36.185:8080/usuarios/${userId}/upload-foto`,
        formData,
        {headers: {'Content-Type': 'multipart/form-data'}},
      );

      const newPhotoUrl = response.data.fotoUrl;
      setUserPhoto(newPhotoUrl);
      await AsyncStorage.setItem('userPhoto', newPhotoUrl);
      Alert.alert('Sucesso', 'Foto de perfil atualizada!');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível enviar a foto.');
      console.log('Erro detalhado:', error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      {/* CONTAINER DA FOTO COM O LÁPIS */}
      <View style={styles.photoContainer}>
        <Image source={{uri: userPhoto}} style={styles.profileImage} />
        <TouchableOpacity style={styles.editButton} onPress={handleEditPhoto}>
          <Text style={{fontSize: 16}}>✏️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileMenu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('ProfileInfo')}>
          <Text>👤 Informações do Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('RentalHistory')}>
          <Text>🕓 Histórico de aluguéis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('rentedBooks')}>
          <Text>📚 Meus livros alugados</Text>
        </TouchableOpacity>

        {userRole === 'ADMIN' && (
          <TouchableOpacity
            style={[styles.menuItem, {backgroundColor: '#d2831c'}]}
            onPress={() => navigation.navigate('AdminPanel')}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              🛠️ Painel Administrativo
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 20,
    alignItems: 'center',
  },
  title: {color: '#111', fontSize: 22, marginBottom: 25, fontWeight: 'bold'},
  photoContainer: {position: 'relative', marginBottom: 20},
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    backgroundColor: '#fff',
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
  },
  profileMenu: {marginTop: 10, width: '100%'},
  menuItem: {
    padding: 18,
    backgroundColor: '#b5b5b5',
    borderRadius: 12,
    marginBottom: 12,
  },
});

export default Profile;
