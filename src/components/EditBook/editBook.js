import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {DadosContext} from '../contextData/contextData';

import Footer from '../footer/Footer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const EditBook = ({route}) => {
  const {updateBook} = useContext(DadosContext);
  const navigation = useNavigation();
  const {book} = route.params;
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [genre, setGenre] = useState(book.genre);

  const handleSave = () => {
    const updatedBook = {
      ...book, // Mantém o ID e a imagem originais
      title: title,
      author: author,
      description: description,
      genre: genre,
    };

    updateBook(book.id, updatedBook);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        <Text style={styles.label}>Título do Livro</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Digite o título"
          placeholderTextColor="#000"
        />

        <Text style={styles.label}>Autor</Text>
        <TextInput
          style={styles.input}
          value={author}
          onChangeText={setAuthor}
          placeholder="Digite o autor"
          placeholderTextColor="#000"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Digite a descrição"
          placeholderTextColor="#000"
        />

        <Text style={styles.label}>Gênero</Text>
        <TextInput
          style={styles.input}
          value={genre}
          onChangeText={setGenre}
          placeholder="Digite o gênero"
          placeholderTextColor="#000"
        />

        <TouchableOpacity onPress={handleSave}>
          <View style={styles.button}>
            <Icon name="save-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Salvar Alterações</Text>
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

export default EditBook;
