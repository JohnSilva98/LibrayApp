import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Footer from '../footer/Footer';
import {useNavigation} from '@react-navigation/native';

const AddBook = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [genero, setGenero] = useState('');
  const [capaUrl, setCapaUrl] = useState(null); // Agora guardamos apenas a URL da string
  const [sugestoes, setSugestoes] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Busca no Google Books
  const handleBuscaNome = async texto => {
    setNome(texto);
    if (texto.length > 3) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${texto}&maxResults=5`,
        );
        const data = await response.json();
        if (data.items) {
          const livros = data.items.map(item => ({
            id: item.id,
            nome: item.volumeInfo.title,
            autor: item.volumeInfo.authors
              ? item.volumeInfo.authors[0]
              : 'Autor Desconhecido',
            descricao: item.volumeInfo.description || 'Sem descrição',
            genero: item.volumeInfo.categories
              ? item.volumeInfo.categories[0]
              : 'Outros',
            capa:
              item.volumeInfo.imageLinks?.thumbnail?.replace(
                'http://',
                'https://',
              ) || null,
          }));
          setSugestoes(livros);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setSugestoes([]);
    }
  };

  // Preenche o formulário ao selecionar uma sugestão
  const selecionarLivro = livro => {
    setNome(livro.nome);
    setAutor(livro.autor);
    setDescricao(livro.descricao);
    setGenero(livro.genero);
    setCapaUrl(livro.capa);
    setSugestoes([]); // Limpa as sugestões
  };

  const handleAddBook = async () => {
    setUploading(true);
    try {
      const response = await axios.post(
        'http://10.215.36.185:8080/livros',
        {
          nome,
          autor,
          genero,
          descricao,
          capaUrl, // Enviamos a URL da string diretamente
        },
        {headers: {'Content-Type': 'application/json'}},
      );
      console.log('OK:', response.data);
      navigation.navigate('HomeScreen');
    } catch (err) {
      console.log('Erro ao salvar:', err.response?.data || err);
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        {/* Visualização da Capa Selecionada */}
        <View style={styles.coverPreview}>
          {capaUrl ? (
            <Image source={{uri: capaUrl}} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={{color: '#888'}}>A capa aparecerá aqui</Text>
            </View>
          )}
        </View>

        <Text style={styles.label}>Título do Livro</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={handleBuscaNome}
          placeholder="Comece a digitar o nome..."
          placeholderTextColor="#999"
        />

        {/* Lista de Sugestões Estilizada */}
        {sugestoes.length > 0 && (
          <View style={styles.sugestaoContainer}>
            {sugestoes.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.sugestaoItem}
                onPress={() => selecionarLivro(item)}>
                <Text style={styles.sugestaoTexto}>
                  {item.nome} - {item.autor}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Autor</Text>
        <TextInput style={styles.input} value={autor} onChangeText={setAutor} />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, {height: 80}]}
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <Text style={styles.label}>Gênero</Text>
        <TextInput
          style={styles.input}
          value={genero}
          onChangeText={setGenero}
        />

        <TouchableOpacity onPress={handleAddBook} disabled={uploading}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {uploading ? 'Salvando...' : 'Confirmar Cadastro'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  form: {padding: 20},
  label: {fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#333'},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#000',
  },
  coverPreview: {alignItems: 'center', marginBottom: 20},
  image: {width: 120, height: 180, borderRadius: 8},
  placeholder: {
    width: 120,
    height: 180,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  sugestaoContainer: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: -10,
    marginBottom: 15,
    elevation: 3, // sombra no android
  },
  sugestaoItem: {padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee'},
  sugestaoTexto: {fontSize: 14, color: '#333'},
  button: {
    backgroundColor: '#d2831cff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default AddBook;
