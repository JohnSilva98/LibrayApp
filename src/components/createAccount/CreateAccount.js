import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function CreateAccount() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Preencha o nome';
    if (!form.lastName.trim()) e.lastName = 'Preencha o ultimo nome';
    if (!form.dob) e.dob = 'Preencha a data de nascimento';
    if (!form.gender) e.gender = 'Preencha o gênero';
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

  const handleSubmit = () => {
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length === 0) {
      console.log('Submitted:', form);
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding: 20}}>
      <Text style={{fontSize: 22, marginBottom: 12}}>
        Create account / Login
      </Text>

      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>First name</Text>
          <TextInput
            name="firstName"
            value={form.firstName}
            onChangeText={value => handleChange('firstName', value)}
            style={styles.input}
            placeholder="First name"
          />
          {errors.firstName && (
            <Text style={styles.error}>{errors.firstName}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Last name</Text>
          <TextInput
            name="lastName"
            value={form.lastName}
            onChangeText={value => handleChange('lastName', value)}
            style={styles.input}
            placeholder="Last name"
          />
          {errors.lastName && (
            <Text style={styles.error}>{errors.lastName}</Text>
          )}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Date of birth</Text>
        <TextInput
          name="dob"
          value={form.dob}
          onChangeText={value => handleChange('dob', value)}
          style={styles.input}
          placeholder="YYYY-MM-DD"
        />
        {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Gender</Text>
        {/* <Picker
          selectedValue={form.gender}
          onValueChange={value => handleChange('gender', value)}
          style={styles.input}>
          <Picker.Item label="Choose..." value="" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Non-binary" value="nonbinary" />
          <Picker.Item label="Prefer not to say" value="prefer_not" />
        </Picker> */}
        {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          name="phone"
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
          name="email"
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
        <Text style={styles.label}>Password</Text>
        <TextInput
          name="password"
          value={form.password}
          onChangeText={value => handleChange('password', value)}
          style={styles.input}
          placeholder="Choose a secure password"
          secureTextEntry={true}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>

      <Button title="Submit" onPress={handleSubmit} />

      {submitted && (
        <Text style={styles.success}>Form submitted successfully.</Text>
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
  },
  label: {
    marginBottom: 6,
    fontSize: 13,
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
