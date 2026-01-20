import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LoginScreen() {
  const API_BASE = 'http://10.215.36.185:8080';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!email.trim() || !password) {
      setError('Por favor, preencha email e senha.');
      return;
    }

    setError('');
    try {
      console.log('=== INICIANDO LOGIN ===');
      console.log('Tentando login com:', {email, password});
      
      const response = await axios.post(
        `${API_BASE}/usuarios/login`,
        {
          email: email,
          senha: password,
        },

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      
      console.log('Status da resposta:', response.status);
      
      // Fazer parsing manual para evitar erro de referência circular
      let responseData;
      try {
        if (typeof response.data === 'string') {
          responseData = JSON.parse(response.data);
        } else {
          responseData = response.data;
        }
      } catch (parseError) {
        console.error('Erro ao fazer parse da resposta:', parseError);
        console.log('Tentando extrair dados com regex...');
        
        // Converter para string se não for
        const dataString = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        
        // Regex melhorado para extrair dados essenciais
        const idMatch = dataString.match(/"id":(\d+)/);
        const nomeMatch = dataString.match(/"nome":"([^"]+)"/);
        const emailMatch = dataString.match(/"email":"([^"]+)"/);
        const roleMatch = dataString.match(/"role":"([^"]+)"/);
        
        if (idMatch && nomeMatch && emailMatch && roleMatch) {
          responseData = {
            id: parseInt(idMatch[1]),
            nome: nomeMatch[1],
            email: emailMatch[1],
            role: roleMatch[1]
          };
          console.log('Dados extraídos com regex:', responseData);
        } else {
          console.error('Não foi possível extrair dados com regex');
          console.log('idMatch:', idMatch);
          console.log('nomeMatch:', nomeMatch);
          console.log('emailMatch:', emailMatch);
          console.log('roleMatch:', roleMatch);
        }
      }
      
      console.log('Resposta processada:', responseData);
      
      // Verificar se a resposta contém dados
      if (!responseData) {
        console.error('Resposta da API está vazia ou undefined');
        setError('Erro no servidor. Tente novamente.');
        return;
      }
      
      // 1. Extrair apenas os dados essenciais do primeiro nível para evitar referência circular
      const userData = {
        id: responseData.id,
        nome: responseData.nome,
        email: responseData.email,
        role: responseData.role,
        fotoUrl: responseData.fotoUrl
      };
      
      console.log('Dados extraídos:', userData);
      
      // Verificar se os dados essenciais existem
      if (!userData.id || !userData.nome || !userData.role) {
        console.error('Dados essenciais faltando:', userData);
        setError('Dados do usuário incompletos. Contate o suporte.');
        return;
      }

      console.log('=== SALVANDO NO ASYNCSTORAGE ===');
      // 2. SALVANDO NO DISPOSITIVO (AsyncStorage é assíncrono!)
      await AsyncStorage.setItem('userId', String(userData.id));
      console.log('userId salvo:', userData.id);
      
      await AsyncStorage.setItem('userName', userData.nome);
      console.log('userName salvo:', userData.nome);
      
      await AsyncStorage.setItem('userRole', userData.role);
      console.log('userRole salvo:', userData.role);
      
      if (userData.fotoUrl) {
        await AsyncStorage.setItem('userPhoto', userData.fotoUrl);
        console.log('userPhoto salvo:', userData.fotoUrl);
      }

      console.log('=== VERIFICANDO DADOS SALVOS ===');
      const verifyUserId = await AsyncStorage.getItem('userId');
      const verifyUserName = await AsyncStorage.getItem('userName');
      const verifyUserRole = await AsyncStorage.getItem('userRole');
      console.log('Verificação - userId:', verifyUserId);
      console.log('Verificação - userName:', verifyUserName);
      console.log('Verificação - userRole:', verifyUserRole);

      console.log('Login OK. ID salvo:', userData.id);
      console.log('=== NAVEGANDO PARA HOME ===');
      navigation.navigate('HomeScreen');
    } catch (err) {
      console.error('=== ERRO NO LOGIN ===');
      console.error('Erro completo:', err);
      console.error('Erro response:', err.response?.data);
      console.error('Erro status:', err.response?.status);
      console.log('Erro no login:', err.response?.data);
      setError('Email ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="you@example.com"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  field: {
    width: '100%',
    marginBottom: 16,
    color: '#000',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: '#b00020',
    marginBottom: 12,
  },
});
