import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';

function CreateAccount() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    firstName: '',
    phone: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Preencha o nome';
    if (!form.phone.trim()) e.phone = 'Preencha o telefone';
    if (!form.email.trim()) e.email = 'Preencha o email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Email inválido';
    if (!form.password) e.password = 'Preencha a senha';
    else if (form.password.length < 6)
      e.password = 'A senha deve ter pelo menos 6 caracteres';
    return e;
  };

  const handleChange = (name, value) => {
    setForm(s => ({...s, [name]: value}));
    setErrors(err => ({...err, [name]: undefined}));
  };

  const handleSubmit = async () => {
    const eobj = validate();
    setErrors(eobj);

    if (Object.keys(eobj).length !== 0) {
      setSubmitted(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.0.111:8080/usuarios',
        {
          nome: form.firstName,
          telefone: form.phone,
          email: form.email,
          senha: form.password,
          role: form.role,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Usuário criado com sucesso:', response.data);
      setSubmitted(true);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding: 20}}>
      <Text style={{fontSize: 22, marginBottom: 12}}>Criar conta / Login</Text>
      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            value={form.firstName}
            onChangeText={value => handleChange('firstName', value)}
            style={styles.input}
            placeholder="Nome"
          />
          {errors.firstName && (
            <Text style={styles.error}>{errors.firstName}</Text>
          )}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          value={form.phone}
          onChangeText={value => handleChange('phone', value)}
          style={styles.input}
          placeholder="+1 (555) 555-5555"
          keyboardType="phone-pad"
        />
        {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={form.email}
          onChangeText={value => handleChange('email', value)}
          style={styles.input}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          value={form.password}
          onChangeText={value => handleChange('password', value)}
          style={styles.input}
          placeholder="Escolha uma senha segura"
          secureTextEntry={true}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>
      <Button title="Criar conta" onPress={handleSubmit} />
      {submitted && (
        <Text style={styles.success}>Formulário enviado com sucesso.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  field: {
    flex: 1,
    marginBottom: 12,
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#000',
  },
  label: {
    marginBottom: 6,
    fontSize: 13,
    color: '#000000ff',
  },
  error: {
    marginTop: 6,
    color: '#b00020',
    fontSize: 12,
  },
  success: {
    marginTop: 12,
    color: 'green',
    fontSize: 14,
  },
});

export default CreateAccount;
