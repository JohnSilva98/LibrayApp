import React, {useContext, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {DadosContext} from '../contextData/contextData';

const RentalHistory = () => {
  const {history = [], fetchRentalHistory} = useContext(DadosContext);

  useEffect(() => {
    fetchRentalHistory();
  }, [fetchRentalHistory]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕓 Histórico de Aluguéis</Text>

      {history.length === 0 ? (
        <Text style={styles.empty}>Você ainda não alugou nenhum livro.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={item => item.rentalId.toString()}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.date}>
                Alugado em: {new Date(item.rentDate).toLocaleDateString()}
              </Text>
              <Text style={styles.date}>
                Devolução: {new Date(item.returnDate).toLocaleDateString()}
              </Text>
              <Text
                style={[
                  styles.status,
                  {color: item.returned ? '#0f0' : '#f08c13'},
                ]}>
                {item.returned ? '✅ Devolvido' : '📚 Em uso'}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212', padding: 20},
  title: {color: '#ffc107', fontSize: 22, marginBottom: 15},
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  bookTitle: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  author: {color: '#ccc', marginBottom: 5},
  date: {color: '#aaa', fontSize: 14},
  status: {marginTop: 10, fontWeight: 'bold'},
  empty: {color: '#888', fontSize: 16, textAlign: 'center', marginTop: 30},
});

export default RentalHistory;
