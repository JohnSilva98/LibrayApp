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
import {supabase} from '@supabase/supabase-js';
import axios from 'axios';
import Footer from '../footer/Footer';
import {useNavigation} from '@react-navigation/native';

const AddBook = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [genero, setGenero] = useState('');
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

  const handleAddBook = async () => {
    let imageUrl = null;

    // if (image) {
    //   imageUrl = await uploadToSupabase();
    // }

    try {
      const response = await axios.post(
        'http://192.168.0.111:8080/livros',
        {
          nome,
          autor,
          genero,
          descricao,
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
            <Text style={{color: '#555'}}>Selecionar capa do livro</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Título do Livro</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o título"
          placeholderTextColor="#000"
        />

        <Text style={styles.label}>Autor</Text>
        <TextInput
          style={styles.input}
          value={autor}
          onChangeText={setAutor}
          placeholder="Digite o autor"
          placeholderTextColor="#000"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição"
          placeholderTextColor="#000"
        />

        <Text style={styles.label}>Gênero</Text>
        <TextInput
          style={styles.input}
          value={genero}
          onChangeText={setGenero}
          placeholder="Digite o gênero"
          placeholderTextColor="#000"
        />

        <TouchableOpacity onPress={handleAddBook}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {uploading ? 'Enviando...' : 'Adicionar Livro'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
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

export default AddBook;
