import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileInfo = () => {
  const navigation = useNavigation();

  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState(''); // Estado para a senha
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        console.log('Iniciando carregamento de dados do usuário...');
        const storedId = await AsyncStorage.getItem('userId');
        console.log('ID encontrado no AsyncStorage:', storedId);

        if (storedId) {
          console.log('Fazendo requisição para:', `http://10.215.36.185:8080/usuarios/${storedId}`);
          const response = await axios.get(
            `http://10.215.36.185:8080/usuarios/${storedId}`,
          );
          console.log('Resposta da API:', response.data);
          const user = response.data;

          setId(user.id);
          setNome(user.nome);
          setEmail(user.email);
          setTelefone(user.telefone || '');
          setSenha(user.senha || ''); // Preenche com a senha atual vinda do banco
          console.log('Dados carregados com sucesso!');
        } else {
          console.log('Nenhum userId encontrado no AsyncStorage');
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        console.error('Detalhes do erro:', error.response?.data || error.message);
        Alert.alert('Erro', 'Não foi possível carregar seus dados.');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleSave = async () => {
    if (!senha || senha.length < 4) {
      Alert.alert('Aviso', 'A senha deve ter pelo menos 4 caracteres.');
      return;
    }

    try {
      const profileData = {
        nome: nome,
        senha: senha, // Enviando a senha atualizada (ou a mesma de antes)
        // telefone: telefone, // Inclua se o seu DTO no Java aceitar
      };

      await axios.put(`http://10.215.36.185:8080/usuarios/${id}`, profileData);

      await AsyncStorage.setItem('userName', nome);

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao atualizar perfil.');
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#d2831c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, {backgroundColor: '#eee'}]}
          value={email}
          editable={false}
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, {flex: 1, marginBottom: 0}]}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true} // Esconde os caracteres por segurança
            placeholder="Digite sua senha"
          />
        </View>
        <Text
          style={{fontSize: 12, color: '#666', marginBottom: 20, marginTop: 5}}>
          Dica: Se não quiser mudar, mantenha a senha atual.
        </Text>

        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Icon name="save-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}> Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  form: {padding: 20},
  label: {fontSize: 16, marginBottom: 5, color: '#333', fontWeight: 'bold'},
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d2831c',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default ProfileInfo;
