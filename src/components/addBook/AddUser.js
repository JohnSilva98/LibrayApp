import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

import {useNavigation} from '@react-navigation/native';

const AddUser = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // =========================
  // selecionar imagem
  // =========================
  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.8,
    });

    if (result?.assets?.length > 0) {
      setImage(result.assets[0]); // contém base64 e uri
    }
  };

  const handleAddUser = async () => {
    let imageUrl = null;

    // if (image) {
    //   imageUrl = await uploadToSupabase();
    // }

    try {
      const response = await axios.post(
        'http://10.215.36.185:8080/usuarios',
        {
          nome,
          email,
          telefone,
          senha,
          imagem: imageUrl,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      );

      console.log('OK:', response.data);
      navigation.navigate('HomeScreen');
    } catch (err) {
      console.log('Erro insert:', err.response?.data || err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image
              source={{uri: image.uri}}
              style={{width: 120, height: 160, borderRadius: 8}}
            />
          ) : (
            <Text style={{color: '#555'}}>Selecionar imagem de perfil</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: José da Silva"
          placeholderTextColor="#000"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite o email"
          placeholderTextColor="#000"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="e.g., (11) 98456-7890"
          keyboardType="phone-pad"
          placeholderTextColor="#000"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite a senha"
          placeholderTextColor="#000"
        />

        <TouchableOpacity onPress={handleAddUser} disabled={uploading}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {uploading ? 'Enviando...' : 'Adicionar Usuário'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  form: {padding: 20},
  label: {fontSize: 18, marginBottom: 10, color: '#111'},
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: '#d2831cff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16},
  imagePicker: {
    width: 130,
    height: 170,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default AddUser;
