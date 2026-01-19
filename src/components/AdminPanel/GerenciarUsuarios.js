import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
// Certifique-se de que o import do contexto está correto (com ou sem chaves)
import {DadosContext} from '../contextData/contextData';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Footer from '../footer/Footer';
import Icon from 'react-native-vector-icons/Ionicons';

const GerenciarUsuarios = () => {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState([]); // Estado para guardar a lista do banco
  const [loading, setLoading] = useState(true); // Estado para saber se está carregando

  // Função para buscar dados do Backend
  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://10.215.36.185:8080/usuarios');
      setUsuarios(response.data); // Salva os dados do H2 no estado
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      Alert.alert('Erro', 'Não foi possível carregar os usuários do servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Executa assim que a tela abre
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Função para deletar no banco e atualizar a tela
  const deleteUsuario = async id => {
    try {
      await axios.delete(`http://10.215.36.185:8080/usuarios/${id}`);
      Alert.alert('Sucesso', 'Usuário removido.');
      fetchUsuarios(); // Recarrega a lista após deletar
    } catch (error) {
      Alert.alert('Erro', 'Falha ao deletar usuário.');
    }
  };

  const confirmarExclusao = (id, nome) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja remover o usuário "${nome}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel', // Não faz nada, apenas fecha o alerta
        },
        {
          text: 'Remover',
          onPress: () => deleteUsuario(id), // Se clicar aqui, chama sua função do Axios
          style: 'destructive',
        },
      ],
    );
  };

  const renderUsuario = ({item}) => (
    <View style={styles.userCard}>
      {/* Ícone de perfil ou imagem do usuário */}
      <View style={styles.avatarContainer}>
        {item.foto ? (
          <Image source={{uri: item.foto}} style={styles.userImage} />
        ) : (
          <Icon name="person-circle-outline" size={50} color="#ccc" />
        )}
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.nome}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userRole}>{item.cargo || 'Usuário'}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditUser', {usuario: item})}>
          <Icon name="create-outline" size={18} color="#17ea3aff" />
          <Text style={styles.buttonText}> Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => confirmarExclusao(item.id, item.nome)}>
          <Icon name="trash-outline" size={18} color="#e21414ff" />
          <Text style={styles.buttonTextRed}> Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Gerenciar Usuários</Text>
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUsuario}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{textAlign: 'center'}}>Nenhum usuário encontrado.</Text>
        }
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f0ee',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginVertical: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 100,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 3,
  },
  avatarContainer: {
    marginRight: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  userEmail: {
    fontSize: 13,
    color: '#666',
  },
  userRole: {
    fontSize: 11,
    color: '#d2831cff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  actionButtons: {
    flexDirection: 'column', // Botões um em cima do outro para caber melhor
    gap: 5,
  },
  button: {
    backgroundColor: '#eae9e6ff',
    borderRadius: 6,
    width: 85,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonTextRed: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default GerenciarUsuarios;
