import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';

export default function AdminDashboard({navigation}) {
  const [stats, setStats] = useState({totalLivros: 0, totalUsuarios: 0});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Ajuste os endpoints conforme sua API
      const resLivros = await axios.get('http://192.168.0.111:8080/livros');
      const resUsuarios = await axios.get('http://192.168.0.111:8080/usuarios');

      setStats({
        totalLivros: resLivros.data.length,
        totalUsuarios: resUsuarios.data.length,
      });
    } catch (error) {
      console.error('Erro ao carregar dados do painel:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Painel Administrativo</Text>

      {/* Seção de Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Livros</Text>
          <Text style={styles.cardNumber}>{stats.totalLivros}</Text>
        </View>

        <View style={[styles.card, {backgroundColor: '#e1f5fe'}]}>
          <Text style={styles.cardTitle}>Usuários</Text>
          <Text style={styles.cardNumber}>{stats.totalUsuarios}</Text>
        </View>
      </View>

      {/* Seção de Ações */}
      <View style={styles.menu}>
        <Text style={styles.menuLabel}>Gerenciamento</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('GerenciarLivros')}>
          <Text style={styles.buttonText}>📚 Gerenciar Livros</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#28a745'}]}
          onPress={() => navigation.navigate('GerenciarUsuarios')}>
          <Text style={styles.buttonText}>👥 Gerenciar Usuários</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8f9fa', padding: 20},
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    marginTop: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff3e0',
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
  },
  cardTitle: {fontSize: 16, color: '#666'},
  cardNumber: {fontSize: 28, fontWeight: 'bold', color: '#111', marginTop: 5},
  menu: {width: '100%'},
  menuLabel: {fontSize: 18, fontWeight: '600', marginBottom: 15, color: '#444'},
  button: {
    backgroundColor: '#007bff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});
