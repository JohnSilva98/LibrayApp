import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios'; // Importar axios para salvar no banco
import Footer from '../footer/Footer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const EditBook = ({route}) => {
  const navigation = useNavigation();
  const {book} = route.params;

  // Ajustado para os nomes que vêm do seu banco (H2/Spring)
  const [nome, setNome] = useState(book.nome || book.title);
  const [autor, setAutor] = useState(book.autor || book.author);
  const [descricao, setDescription] = useState(
    book.descricao || book.description,
  );
  const [genero, setGenre] = useState(book.genero || book.genre);

  const handleSave = async () => {
    // Objeto formatado para o que o seu Backend espera
    const updatedBook = {
      ...book,
      nome: nome,
      autor: autor,
      descricao: descricao,
      genero: genero,
    };

    try {
      // Faz a atualização diretamente no Banco de Dados
      await axios.put(
        `http://10.215.36.185:8080/livros/${book.id}`,
        updatedBook,
      );

      Alert.alert('Sucesso', 'Livro atualizado com sucesso!');
      navigation.goBack(); // Volta para a lista, que será atualizada pelo useFocusEffect
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações no servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        <Text style={styles.label}>Título do Livro</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o título"
          placeholderTextColor="#666"
        />

        <Text style={styles.label}>Autor</Text>
        <TextInput
          style={styles.input}
          value={autor}
          onChangeText={setAutor}
          placeholder="Digite o autor"
          placeholderTextColor="#666"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, {height: 80}]} // Aumentado para descrição
          value={descricao}
          onChangeText={setDescription}
          placeholder="Digite a descrição"
          multiline
          placeholderTextColor="#666"
        />

        <Text style={styles.label}>Gênero</Text>
        <TextInput
          style={styles.input}
          value={genero}
          onChangeText={setGenre}
          placeholder="Digite o gênero"
          placeholderTextColor="#666"
        />

        <TouchableOpacity onPress={handleSave}>
          <View style={styles.button}>
            <Icon name="save-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}> Salvar Alterações</Text>
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
