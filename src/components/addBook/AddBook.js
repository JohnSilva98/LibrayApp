import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Footer from '../footer/Footer';
import {useNavigation} from '@react-navigation/native';
import {set} from 'react-native-reanimated';

const AddBook = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [descricao, setDescricao] = useState('');
  const [genero, setGenero] = useState('');

  const handleAddBook = async () => {
    try {
      const response = await axios.post(
        'http://10.215.36.185:8080/livros',
        {
          nome: nome,
          autor: autor,
          genero: genero,
          descricao: descricao,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Inserção OK:', response.data);
      navigation.navigate('HomeScreen');
    } catch (err) {
      console.log('Erro na inserção:', err.response?.data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Título do Livro</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o título do livro"
          placeholderTextColor="#000"
        />
        <Text style={styles.label}>Autor do Livro</Text>
        <TextInput
          style={styles.input}
          value={autor}
          onChangeText={setAutor}
          placeholder="Digite o autor do livro"
          placeholderTextColor="#000"
        />
        {/* <Text style={styles.label}>URL da Imagem do Livro</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="Digite a URL da imagem do livro"
          placeholderTextColor="#000"
        /> */}
        <Text style={styles.label}>Descrição do Livro</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição do livro"
          placeholderTextColor="#000"
        />

        <Text style={styles.label}>Gênero do Livro </Text>
        <TextInput
          style={styles.input}
          value={genero}
          onChangeText={setGenero}
          placeholder="Digite o gênero do livro"
          placeholderTextColor="#000"
        />

        <TouchableOpacity onPress={handleAddBook}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Adicionar Livro</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#111111',
  },
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
  buttonText: {
    color: '#f3f0f0ff',
    fontSize: 16,
  },
});
export default AddBook;
